document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.querySelector('#toggleBtn')
    const closeBtn = document.querySelector('#closeBtn')
    const mobileNav = document.querySelector('.mobile-nav')
    const bookmarkBtn = document.querySelector('.bookmark-btn')
    const overlay = document.querySelector('#overlay')
    checkScreenWidth();

    // MOBILE MENU
    toggle.addEventListener('click', () => {
        toggle.classList.add('hidden')
        closeBtn.classList.remove('hidden')
        mobileNav.classList.remove('hidden')
        overlay.classList.remove('hidden')

    })

    closeBtn.addEventListener('click', () => {
        toggle.classList.remove('hidden')
        closeBtn.classList.add('hidden')
        mobileNav.classList.add('hidden')
        overlay.classList.add('hidden')

    })

    // BOOKMARK BUTTON
    function checkScreenWidth() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 500) {
            bookmarkBtn.textContent = "";
        } else {
            bookmarkBtn.textContent = "Bookmark";
        }
    }

    // const bookmarkImage = document.querySelector('#bookmarkImage');
    let isBookmarked = false;

    bookmarkBtn.addEventListener('click', () => {
        isBookmarked = !isBookmarked;

        if (isBookmarked && window.innerWidth >= 500) {
            bookmarkBtn.textContent = 'Bookmarked';
            bookmarkBtn.classList.add('bookmarked')
            // bookmarkImage.style.fill = "green"
        } else {
            if (window.innerWidth >= 500) {
                bookmarkBtn.textContent = 'Bookmark';
            }
            // bookmarkImage.style.fill = "green"
            bookmarkBtn.classList.remove('bookmarked')
        }
    });

    window.addEventListener("resize", checkScreenWidth);
    checkScreenWidth();



    // GRAPH
    const totalPledged = document.getElementById("total");
    const goalAmount = 100000;
    const progressBar = document.getElementById("progress-bar");

    function updateProgressBar(percentage) {
        progressBar.style.width = percentage + "%";
    }
    updateProgressBar(totalPledged.textContent)

    function updateProgressBarWithPercentage() {
        const pledgedAmount = parseFloat(totalPledged.textContent.replace(/[^0-9.]/g, ""));
        const percentage = (pledgedAmount / goalAmount) * 100;

        updateProgressBar(percentage);
    }

    updateProgressBarWithPercentage();
    function updateTotalPledged(newAmount) {
        totalPledged.textContent = `$${newAmount}`;
        updateProgressBarWithPercentage();
    }

    // SCROLL BACK TO TOP
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // OPEN PLEDGE MODAL
    const rewardBtns = document.querySelectorAll('.reward-btn');
    const pledgeModal = document.querySelector('#pledgeModal');
    const backProjectBtn = document.querySelector('#backProjectBtn');

    backProjectBtn.addEventListener('click', () => {
        pledgeModal.classList.remove('hidden');
        overlay.classList.remove('hidden')

        scrollToTop()

    })

    rewardBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            pledgeModal.classList.remove('hidden');
            overlay.classList.remove('hidden')
            scrollToTop()
        });
    });

    // CLOSE MODAL 
    const closeModal = document.querySelector('#modalCloseBtn')

    closeModal.addEventListener('click', () => {
        pledgeModal.classList.add('hidden');
        overlay.classList.add('hidden')

    })

    // SHOW DROPDOWNS
    const radioButtons = document.querySelectorAll('.pledge-radio')
    const dropdowns = document.querySelectorAll('.dropdown')


    radioButtons.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            if (radio.classList.contains('out-of-stock')) {
                alert('Sorry we are out of stock, please select another product')
            } else if (radio.classList.contains('active')) {
                radio.classList.remove('active');
                dropdowns[index].classList.add('hidden');
            } else {
                radioButtons.forEach(item => {
                    item.classList.remove('active');
                });
                dropdowns.forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });

                radio.classList.add('active');
                dropdowns[index].classList.remove('hidden');
                activeBorder()
            }
        });
    });

    // FINAL VALIDATION & SUCCESS MODAL 
    const continueBtns = document.querySelectorAll('.continue');
    const successModal = document.querySelector('.success-modal');
    const errorMsgs = document.querySelectorAll('.errorMessage');
    const pledge = document.querySelectorAll('.pledge-amount-input');

    continueBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let hasError = false;
            let totalPledgedAmount = 0;

            pledge.forEach((amountInput) => {
                const pledgedAmount = parseFloat(amountInput.value);
                const placeholderValue = parseFloat(amountInput.dataset.placeholder);

                if (pledgedAmount < placeholderValue || amountInput.value === 0) {
                    errorMsgs[index].textContent = 'Please enter a valid amount';
                    pledge[index].style.borderColor = "red"
                    errorMsgs[index].style.color = "red"
                    hasError = true;
                } else {
                    totalPledgedAmount += pledgedAmount;
                }
            });

            if (!hasError) {
                errorMsgs[index].textContent = '';
                pledgeModal.classList.add('hidden');
                successModal.classList.remove('hidden');
                scrollToTop();
            }
        });
    });

    // FINAL COMPLETE BUTTON
    const completeBtn = document.querySelector('.complete');

    completeBtn.addEventListener('click', () => {
        successModal.classList.add('hidden')
        overlay.classList.add('hidden')

        scrollToTop()
        updateBackers()
    })

    // AMOUNT OF BACKERS UPDATE
    let count = 5008
    const totalBackers = document.querySelector('#totalBackers');
    function updateBackers() {
        totalBackers.textContent = count++
    }

    // UPDATE TOTAL PLEDGED
    function roundToTwoDecimalPlaces(value) {
        return Math.round(value * 100) / 100;
    }

    function updateTotal() {
        let newTotal = parseFloat(totalPledged.textContent.replace(/[^0-9.]/g, ""));

        pledge.forEach((amountInput) => {
            const pledgedAmount = parseFloat(amountInput.value);

            if (!isNaN(pledgedAmount)) {
                newTotal = roundToTwoDecimalPlaces(newTotal + pledgedAmount);
            }
        });

        totalPledged.textContent = `$${newTotal.toFixed(2)}`;
        updateProgressBarWithPercentage();
    }

    pledge.forEach((amountInput) => {
        amountInput.addEventListener('input', updateTotal);
        // console.log(newTotal)
        // console.log(pledgedAmount)
    });

    // CHANGE ACTIVE BORDER COLOR
    const pledgeRadios = document.querySelectorAll('input[type="radio"][name="pledge-option"]');
    const pledgeContainer = document.querySelectorAll('.pledge-container')

    function activeBorder() {
        pledgeRadios.forEach((radio) => {
            radio.addEventListener('change', () => {
                pledgeContainer.forEach((container) => {
                    container.classList.remove('active-container');
                });

                if (radio.checked) {
                    const container = radio.closest('.pledge-container');
                    container.classList.add('active-container');
                }
            });
        });
    }

    // DISABLE OUT OF STOCK BUTTONS
    const outOfStockState = document.querySelectorAll('.out-of-stock-btn');
    outOfStockState.forEach(button => {
        button.disabled = true;
    });
});
