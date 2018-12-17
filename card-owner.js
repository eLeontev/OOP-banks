class CardOwner {
    constructor(cards, ownerId) {
        this.ownerId = ownerId;

        this.bindingErrors = [];
        this.bindCardsToOwner(cards);

    }

    bindCardsToOwner(cards) {
        this.cards = cards.map(card => {
            this.bindingErrors.push(card.bindCardToOwner(this.ownerId));

            return card;
        });
    }

    getBindingErrors() {
        let errors = this.bindingErrors.filter(error => error);

        if (errors.length) {
            return {errors};
        }

        return {success: true};
    }

    setCardToATM(ATM_API, cardAPI) {
        this.ATM_API = ATM_API;

        let {isCardSupported} = this.ATM_API;

        let {success, error} = isCardSupported(cardAPI, this.ownerId);

        if (error) {
            return {error};
        }

        return {success};
    }
    getCardFromATM() {
        let {success, error} = this.withCheckATMConnection('getCard');

        if (error) {
            return {error};
        }

        this.ATM_API = null;

        return {success};
    }
    getCardMoney(amount) {
        return this.withCheckATMConnection('cashOutFromCard', amount);
    }
    setCardMoney(amount) {
        return this.withCheckATMConnection('setMoney', amount);
    }
    checkBalance() {
        return this.withCheckATMConnection('getBalance');
    }
    withCheckATMConnection(method, data) {
        let {ATM_API} = this;

        if (ATM_API) {
            return ATM_API[method](data);
        }

        return {
            error: 'operation is not allowed',
        }
    }
}

module.exports = CardOwner;
