let ATM = require('./ATM');

class ATM_reception extends ATM {
    constructor(...props) {
        super(...props);

        this.collectMoney = this.collectMoney.bind(this);
        this.setMoney = this.setMoney.bind(this);
    }

    collectMoney(amount) {
        let {balance} = this;

        if (amount > balance) {
            return {
                error: 'insufficient funds on ATM',
            }
        }

        this.balance = balance - amount;

        return {success: true};
    }

    setMoney(amount) {
        let {cardAPI: {rechargeBalance}, balance, limit} = this;

        if (balance + amount > limit) {
            return {
                error: 'cash is more than available',
            }
        }

        rechargeBalance(amount);

        balance = balance + amount;
        this.balance = balance;

        return {success: true};
    }

    getAPI() {
        let {
            collectMoney,
            setMoney,
        } = this;

        return Object.assign(super.getAPI(), {
            collectMoney,
            setMoney,
        })
    }
}

module.exports = ATM_reception;