const payBtn = document.querySelector('.checkout');
console.log(payBtn);

payBtn.addEventListener('click', () => {
    console.log('hii');
    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/Json' }),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cartItems')),

        })
    })
        .then(res => res.json())
        .then((url) => {
            location.href = url;
        })
        .catch(err => console.log(err));
})