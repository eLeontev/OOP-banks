let ATM = require('./ATM');

class ATM_delivery extends ATM {
    constructor(...props) {
        super(...props);

        this.cashOutFromCard = this.cashOutFromCard.bind(this);
        this.rechargeMoney = this.rechargeMoney.bind(this);
    }

    cashOutFromCard(amount) {
        let {cardAPI: {cashOut}, balance: ATMBalance} = this;

        if (amount > ATMBalance) {
            return {
                error: 'insufficient funds on ATM',
            }
        }

        let {balance, error} = cashOut(amount);

        if (error) {
            return {error};
        }

        this.balance = ATMBalance - amount;

        return {success: true};
    }

    rechargeMoney(amount) {
        let {balance, limit} = this;

        if (balance + amount > limit) {
            return {
                error: 'out of limit',
            }
        }
        this.balance = balance + amount;

        return {success: true};
    }

    getAPI() {
        let {
            cashOutFromCard,
            rechargeMoney,
        } = this;

        return Object.assign(super.getAPI(), {
            cashOutFromCard,
            rechargeMoney,
        })
    }
}

module.exports = ATM_delivery;
// cashOutFromCard(amount) снять деньги с карты
// запрещает снимать деньги из банкомата инкассатору операция не доступна
