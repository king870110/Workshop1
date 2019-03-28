
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];
//Dialog
$('#add_book').click(function () {
    var myWindow = $("#dialog"),
        undo = $("#add_book");

    undo.click(function () {
        myWindow.data("kendoWindow").open();
        undo.fadeOut();
    });

    function onClose() {
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: "800px",
        title: "About Alvar Aalto",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center().open();
});

// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }
}

$(function () {
    loadBookData();
});

//換照片
$(document).ready(function () {
    $("#book_category").change(function () {
        $(".book-image").attr("src", "image/" + $('#book_category').val() + ".jpg");
    });
});

//日期

$(document).ready(function () {
    function startChange() {
        var startDate = start.value(),
            endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
            startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var start = $("#bought_datepicker").kendoDatePicker({
        value: new Date(),
        change: startChange, format: "yyyy-MM-dd"
    }).data("kendoDatePicker");

    var end = $("#delivered_datepicker").kendoDatePicker({
        
        change: endChange, format: "yyyy-MM-dd"
    }).data("kendoDatePicker");

    start.max(end.value());
    end.min(start.value());
});
//money
$(document).ready(function () {
    $("#book_amount").keyup(function () {
        $('#book_total').html($("#book_amount").val() * $("#book_price").val());
    });
    $("#book_price").keyup(function () {
        $('#book_total').html($("#book_amount").val() * $("#book_price").val());
    });
});