document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.querySelector('#toggleBtn')
    const closeBtn = document.querySelector('#closeBtn')
    const mobileNav = document.querySelector('.mobile-nav')
    const main = document.querySelector('.main')
    const hero = document.querySelector('.hero')
    const bookmarkBtn = document.querySelector('.bookmark-btn')

    checkScreenWidth();

    // MOBILE MENU
    toggle.addEventListener('click', () => {
        toggle.classList.add('hidden')
        closeBtn.classList.remove('hidden')
        mobileNav.classList.remove('hidden')
        main.classList.add('overlay')
        hero.classList.add('overlay')
    })

    closeBtn.addEventListener('click', () => {
        toggle.classList.remove('hidden')
        closeBtn.classList.add('hidden')
        mobileNav.classList.add('hidden')
        main.classList.remove('overlay')
        hero.classList.remove('overlay')
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

    const bookmarkImage = document.querySelector('#bookmarkImage');
    let isBookmarked = false; // Track the bookmarked state

    bookmarkBtn.addEventListener('click', () => {
        isBookmarked = !isBookmarked; // Toggle the bookmarked state
        console.log('isBookmarked:', isBookmarked); // Log the state

        if (isBookmarked) {
            bookmarkBtn.textContent = 'Bookmarked';
            bookmarkBtn.classList.add('bookmarked')
            bookmarkImage.classList.add('btn-bookmarked');
        } else {
            bookmarkBtn.textContent = 'Bookmark';
            bookmarkImage.classList.remove('btn-bookmarked');
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

    // Example usage: Call this function whenever the total amount pledged changes
    function updateTotalPledged(newAmount) {
        totalPledged.textContent = `$${newAmount}`;
        updateProgressBarWithPercentage();
    }

    // Example usage:
    // Call updateTotalPledged whenever the total amount pledged changes, e.g., after a new pledge
    // updateTotalPledged(89914); // Example with $89,914 pledged

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
        scrollToTop()

    })

    rewardBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            pledgeModal.classList.remove('hidden');
            scrollToTop()
        });
    });

    // CLOSE MODAL 
    const closeModal = document.querySelector('#modalCloseBtn')

    closeModal.addEventListener('click', () => {
        pledgeModal.classList.add('hidden');

    })

    // SHOW DROPDOWNS
    const radioButtons = document.querySelectorAll('.pledge-radio')
    const dropdowns = document.querySelectorAll('.dropdown')


    radioButtons.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            if (radio.classList.contains('active')) {
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
            }
        });
    });

    // SUCCESS MODAL
    const continueBtns = document.querySelectorAll('.continue');
    const successModal = document.querySelector('.success-modal');

    continueBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            pledgeModal.classList.add('hidden');
            successModal.classList.remove('hidden');
            scrollToTop()
        });
    });

    const completeBtn = document.querySelector('.complete');

    completeBtn.addEventListener('click', () => {
        successModal.classList.add('hidden')
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
    const pledge = document.querySelectorAll('.pledge-amount-input');

    function updateTotal() {
        let newTotal = parseFloat(totalPledged.textContent.replace(/[^0-9.]/g, ""));

        pledge.forEach((amountInput) => {
            const pledgedAmount = parseFloat(amountInput.value);

            if (!isNaN(pledgedAmount)) {
                newTotal += pledgedAmount;
            }
        });

        totalPledged.textContent = `$${newTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        updateProgressBarWithPercentage();
    }


    // Add event listeners to each input field for pledged amounts
    pledge.forEach((amountInput) => {
        amountInput.addEventListener('input', updateTotal);
    });



});
