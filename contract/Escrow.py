# Escrow - Example for illustrative purposes only.

import smartpy as sp

class Escrow(sp.Contract):
    def __init__(self, owner, fromOwner, counterparty, fromCounterparty, epoch, hashedSecret):
        self.init(fromOwner           = fromOwner,
                  fromCounterparty    = fromCounterparty,
                  balanceOwner        = sp.tez(0),
                  balanceCounterparty = sp.tez(0),
                  hashedSecret        = hashedSecret,
                  epoch               = epoch,
                  owner               = owner,
                  counterparty        = counterparty,
                  operator            = sp.address("tz1MJnoNz7m1zYtAf8Uv6VPwbsr2pepeh39L"),
                  ownerWithdraw        = False,
                  counterpartyWithdraw = False,
                  allowRevertFunds = False,
                  )

    @sp.entry_point
    def addBalanceOwner(self):
        sp.verify(self.data.balanceOwner == sp.tez(0))
        sp.verify(sp.amount == self.data.fromOwner)
        self.data.balanceOwner = self.data.fromOwner

    @sp.entry_point
    def addBalanceCounterparty(self):
        sp.verify(self.data.balanceCounterparty == sp.tez(0))
        sp.verify(sp.amount == self.data.fromCounterparty)
        self.data.balanceCounterparty = self.data.fromCounterparty

    def claim(self, identity):
        sp.verify(sp.sender == identity)
        sp.send(identity, self.data.balanceOwner + self.data.balanceCounterparty)
        self.data.balanceOwner = sp.tez(0)
        self.data.balanceCounterparty = sp.tez(0)

    @sp.entry_point
    def claimCounterparty(self, params):
        sp.verify(sp.now < self.data.epoch)
        # Hardcoded to easily know the hash
        sp.verify(sp.blake2b(sp.bytes("0x01223344")) == sp.blake2b(params.secret))
        self.claim(self.data.counterparty)

    @sp.entry_point
    def claimOwner(self):
        sp.verify(self.data.epoch < sp.now)
        self.claim(self.data.owner)

    @sp.entry_point
    def allowRevertFund(self):
        sp.verify(sp.sender == self.data.operator, "NOT_AUTHORISED")
        sp.verify(self.data.allowRevertFunds == False,"ALREADY_ALLOWED")
        sp.verify(self.data.balanceOwner > sp.tez(0), "DEPOSIT_TO_OWNER_FIRST" )
        sp.verify(self.data.balanceCounterparty > sp.tez(0), "DEPOSIT_TO_COUNTEPARTY_FIRST" ) 
        self.data.allowRevertFunds = True

    @sp.entry_point
    def revertFund(self):
        sp.verify(sp.sender == self.data.operator, "NOT_AUTHORISED")
        sp.verify(self.data.allowRevertFunds == True)
        sp.verify(self.data.ownerWithdraw == True)
        sp.verify(self.data.counterpartyWithdraw == True)
        sp.send(self.data.owner, self.data.balanceCounterparty)
        sp.send(self.data.counterparty, self.data.balanceOwner)

        self.data.balanceOwner = sp.tez(0)
        self.data.balanceCounterparty = sp.tez(0)

        self.data.allowRevertFunds = False
        self.data.ownerWithdraw = False
        self.data.counterpartyWithdraw = False
    
    @sp.entry_point
    def acceptWithdrawOwner(self):
        sp.verify(sp.sender == self.data.owner)
        self.data.ownerWithdraw = True
    
    
    @sp.entry_point
    def acceptWithdrawCounterparty(self):
        sp.verify(sp.sender == self.data.counterparty)
        self.data.counterpartyWithdraw = True


    
@sp.add_test(name = "Escrow")
def test():
    scenario = sp.test_scenario()
    scenario.h1("Escrow")
    # This address are edited to cater my own Test Accounts. See account details below
    c1 = Escrow(sp.address("tz1NYtHYN2DshQLrgR94ZMDefguWErhwTDQ6"), sp.tez(50), sp.address("tz1iVeEk22pW7qTugQqRAENn4zpAh6bUKfk6"), sp.tez(4), sp.timestamp(1900937277), sp.bytes("0x01223344"))
    scenario += c1


# This line of code is modified to cater my own Test Accounts
# Timestamp 1900937277 9:00 pm 4/28/2030

# Uncomment to test Claiming Counterparty
sp.add_compilation_target("escrow", Escrow(sp.address("tz1NYtHYN2DshQLrgR94ZMDefguWErhwTDQ6"), sp.tez(50), sp.address("tz1iVeEk22pW7qTugQqRAENn4zpAh6bUKfk6"), sp.tez(4), sp.timestamp(1900937277), sp.bytes("0x01223344")))


# Uncomment to test Claiming Owner. Set to epoch less than sp.now() ex sp.timestamp(123) Edit line 92 timestamp as well. 
# sp.add_compilation_target("escrow", Escrow(sp.address("tz1NYtHYN2DshQLrgR94ZMDefguWErhwTDQ6"), sp.tez(50), sp.address("tz1iVeEk22pW7qTugQqRAENn4zpAh6bUKfk6"), sp.tez(4), sp.timestamp(123), sp.bytes("0x01223344")))