let konum = document.querySelector('.seats');
let konum2 = document.querySelector(".dropdown-menu");
let konum3 = document.querySelector(".price-amount");
const seats = document.querySelectorAll('.seat');
let filmAdi;
let adetBilgi = 0;
let toplamTutar = 25;
let fiyat;
let yazi;


getFromLocalStorage();

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const movieNames = JSON.parse(localStorage.getItem('mName'));
    const fiyatÜcret = JSON.parse(localStorage.getItem('price'));
    filmAdi=movieNames;
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.remove('bg-secondary');
                seat.classList.add('bg-primary');
                seat.classList.add('selected');
                console.log(seat.classList);
            }
        });
    }
    if (fiyatÜcret != null) {
        toplamTutar = fiyatÜcret;
        yazi = `Secilen Film : ${movieNames} | Hesaplanan Tutar : ${fiyatÜcret}`;
        konum3.innerText = yazi;
    }

}


konum2.addEventListener("click", function (e) {
    filmAdi = e.target.innerText;
});

konum.addEventListener("click", function (e) {

    if (e.target.classList.contains('bg-secondary') && !e.target.classList.contains('selected')) {
        e.target.classList.remove('bg-secondary');
        e.target.classList.add('bg-primary');
        e.target.classList.toggle('selected');
        calculateTotal();
    }

});


function calculateTotal() {

    const selectedSeats = konum.querySelectorAll('.seat.bg-primary.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seatsa) {
        return seatsArr.indexOf(seatsa);
    });

    adetBilgi++;
    fiyat = toplamTutar * adetBilgi;
    yazi = `Secilen Film : ${filmAdi} | Hesaplanan Tutar : ${fiyat}`;
    konum3.innerText = yazi;
    saveToLocalStorage(selectedSeatIndexs);
}


function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('price', JSON.stringify(fiyat));
    if (filmAdi == null) {
        filmAdi = "Sin City";
        localStorage.setItem('mName', JSON.stringify(filmAdi));
    }
    else {
        localStorage.setItem('mName', JSON.stringify(filmAdi));
    }

}
