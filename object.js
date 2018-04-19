const finAdvise = Object.create({}, {
    Company: {
        enumerable: true,
        writable: true,
        value: 'Lots of Stocks'
    },
    Specialty: {
        enumerable: true,
        writable: true, 
        value: 'Insider Trading'
    },
    Name: {
        enumerable: true, 
        value: 'John Stockbroker'
    },
    Portfolio: {
        // enumerable: true,
        writable: true,
        value: {
        }
    },
    Worth: {
        value: () => {
            let portfolioWorth = 0
            for (stock in finAdvise.Portfolio) {
                
                portfolioWorth += finAdvise.Portfolio[stock].shares * finAdvise.Portfolio[stock].price
            } 
            return portfolioWorth
        }
    },
    Purchase: {
        value: function (stock, quantity, cost) {
            if (stock in finAdvise.Portfolio) {
                finAdvise.Portfolio[stock].shares += quantity
                finAdvise.Portfolio[stock].price = cost
            } else {
                finAdvise.Portfolio[stock] = {shares: quantity, price: cost}
            }
            worthViewer.innerHTML = finAdvise.Worth()
            printTicker()
        }
    },
    Sell: {
        value: function (stock, quantity, price) {
            if (!(stock in finAdvise.Portfolio) || quantity > finAdvise.Portfolio[stock].shares) {
                console.log('Insufficient shares for transaction!')
            } else {
                finAdvise.Portfolio[stock].shares -= quantity
                finAdvise.Portfolio[stock].price = price
                if (finAdvise.Portfolio[stock].shares === 0) {
                    delete finAdvise.Portfolio[stock]
                }
            }
            worthViewer.innerHTML = finAdvise.Worth()
            printTicker()
        }
    }
})

const  tickerViewer = document.getElementById('ticker')
const worthViewer = document.getElementById('netWorth')
const profileViewer = document.getElementById('brokerProfile')

function printTicker() {
    tickerViewer.innerHTML = ''
    docFrag = document.createDocumentFragment() 
    for (k in finAdvise.Portfolio) {
        const stock = document.createElement('p')
        stock.textContent = `${k}: shares: ${finAdvise.Portfolio[k].shares}, price: ${finAdvise.Portfolio[k].price}`
        docFrag.appendChild(stock)
    }
    tickerViewer.appendChild(docFrag)
}

function printProfile () {
    docFrag = document.createDocumentFragment() 
    for (k in finAdvise) {
        const item = document.createElement('p') 
        item.textContent = `${k}: ${finAdvise[k]}`
        docFrag.appendChild(item)
    }
    profileViewer.appendChild(docFrag)
} 

printProfile()
printTicker()
worthViewer.innerHTML = finAdvise.Worth()

