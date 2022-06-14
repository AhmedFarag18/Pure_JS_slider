// ============== Main function when page loaded ==============
$(document).ready(function() {
    getThumbnails();
    itemIndex();
    nextButton();
    prevButton();
    clickThumbnails();
    showAndHideFullImage();
});

// ============== show Thumbnails img ==========================
function getThumbnails(){
    const navigationImg  = document.querySelector(".XYZ-navigation");
    let slider =[...document.querySelectorAll('.XYZ-img-preview img[alt=img-preview]')];
    
    slider.forEach(el=>{
        navigationImg.innerHTML +=`<img class="XYZ-img-thumbnails" src="${el.attributes.src.value}" alt="" width="75" height="75">`;
    })
    document.querySelectorAll(".XYZ-navigation img")[0].classList.add("active");
}

// ============== start next button ==========================
function nextButton() {
    $(".XYZ-next").on("click", function() {
        let activeImg = $(".active");
        let nextImg = activeImg.next();

        if (nextImg.length) {
            activeImg.removeClass('active');
            nextImg.addClass('active');
            itemIndex();
        } else {
            activeImg.removeClass('active');
            $(".XYZ-img-preview").first().addClass('active');
            $(".XYZ-img-thumbnails").first().addClass('active');
            itemIndex();
        }
    });
}

// ============== start prev button ==========================
function prevButton(){
    $(".XYZ-prev").on("click", function() {
        let activeImg = $(".active");
        let prevImg = activeImg.prev();
        
        if (prevImg.length) {
            activeImg.removeClass('active');
            prevImg.addClass('active');
            itemIndex()
        } else {
            activeImg.removeClass('active');
            $(".XYZ-img-preview").last().addClass('active');
            $(".XYZ-img-thumbnails").last().addClass('active');
            itemIndex()
        }
    });
}


// ============== Click at thumbnail preview image =================
function clickThumbnails(){

    $(".XYZ-img-thumbnails").on("click", function(e) {
        let slider =[...document.querySelectorAll('.XYZ-img-preview')];
        let container = [...document.querySelectorAll('.XYZ-img-thumbnails')];
        $(".XYZ-img-thumbnails").removeClass('active');
        container.forEach((item,index) => {
            e.target.classList.add("active");
            item.classList.remove('active');
        });
        
        $(".XYZ-img-preview").removeClass('active');
        let indexEle  = $('.XYZ-img-thumbnails').filter('.active').index();
        if(indexEle === -1){
            indexEle = slider.length-1;
            let element = slider[indexEle]
            element.classList.add("active");
            e.target.classList.add("active");
            itemIndex()
        }else{
            let element = slider[indexEle]
            element.classList.add("active");
            itemIndex()
        }
    })
}


// ============== get number of image =========================
function itemIndex() {
    let images = $('.XYZ-img-preview');
    var itemIndex = images.index($('.active'));
    $('.XYZ-pp-counter').text((itemIndex + 1) + ' of ' + images.length);
}


// ============== Hide And Show Profile Img Full Width =========================
function showAndHideFullImage(){
    let profileImg = document.querySelector(".XYZ-preview_full-img");
    let image = document.querySelector(".XYZ-preview_full-img img");
    let previewBtn = document.querySelectorAll(".XYZ-preview_img");
    let btnCloseen = document.querySelectorAll(".XYZ-close_profile");
// ============== preview popup of full image =========================
    previewBtn.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            profileImg.classList.add("show");
            let fullPath = ele.parentElement.parentElement.firstElementChild.nextElementSibling.src;
            let pos = fullPath.indexOf('images') + 6;
            let imgPath = fullPath.slice(pos);
            image.setAttribute("src", `images${imgPath}`);
        })
    })
// ============== close the popup full image =========================
    btnCloseen.forEach((ele) => {
        ele.addEventListener("click", () => {
            profileImg.classList.remove("show");
        })
    });
}