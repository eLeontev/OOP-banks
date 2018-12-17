class Card {
    constructor(supportedBanks, balance, cardId) {
        this.cardId = cardId;

        this.balance = balance;
        this.supportedBanks = supportedBanks;

        this.bindCardToOwner = this.bindCardToOwner.bind(this);
        this.getOwnerId = this.getOwnerId.bind(this);
        this.cashOut = this.cashOut.bind(this);
        this.rechargeBalance = this.rechargeBalance.bind(this);
        this.getSupportedBanks = this.getSupportedBanks.bind(this);
        this.getBalance = this.getBalance.bind(this);
    }

    bindCardToOwner(ownerId) {
        let {cardId} = this;

        if (this.ownerId) {
            return {
                error: `the card: ${cardId} is already used by another user: ${this.ownerId}`,
            };
        }

        this.ownerId = ownerId;
    }

    getOwnerId() {
       return this.ownerId;
    }

    cashOut(amount) {
        let {balance} = this;

        if (amount > balance) {
            return {
                error: 'insufficient funds on the card',
            }
        }

        balance = balance - amount;
        this.balance = balance;

        return { balance };
    }

    rechargeBalance(amount) {
        this.balance = this.balance + amount;
    }

    getSupportedBanks() {
        return this.supportedBanks;
    }

    getBalance() {
        return this.balance;
    }

    getAPI() {
        let {
            getOwnerId,
            cashOut,
            rechargeBalance,
            getSupportedBanks,
            bindCardToOwner,
            getBalance,
        } = this;

        return {
            getOwnerId,
            cashOut,
            rechargeBalance,
            getSupportedBanks,
            bindCardToOwner,
            getBalance,
        }
    }
}

module.exports = Card;
