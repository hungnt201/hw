// //nút like
// const likeBtn = document.querySelector(".actionn-1");
// let likeIcon = document.querySelector("#iconlike"),
//     count = document.querySelector("#count");

// let clicked = false;


// likeBtn.addEventListener("click", () => {
//     if (!clicked) {
//         clicked = true;
//         likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
//         count.textContent++;
//     } else {
//         clicked = false;
//         likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
//         count.textContent--;
//     }
// });



//loading

let page = 1;
const last_page = 10;
const pixel_offset = 200;
const throttle = (callBack, delay) => {
    let withinInterval;
    return function() {
        const args = arguments;
        const context = this;
        if (!withinInterval) {
            callBack.call(context, args);
            withinInterval = true;
            setTimeout(() => (withinInterval = false), delay);
        }
    };
};

const httpRequestWrapper = (method, URL) => {
    return new Promise((resolve, reject) => {
        const xhr_obj = new XMLHttpRequest();
        xhr_obj.responseType = "json";
        xhr_obj.open(method, URL);
        xhr_obj.onload = () => {
            const data = xhr_obj.response;
            resolve(data);
        };
        xhr_obj.onerror = () => {
            reject("failed");
        };
        xhr_obj.send();
    });
};

const getData = async(page_no = 1) => {
    const data = await httpRequestWrapper(
        "GET",
        `https://randomuser.me/api/?page=${page_no}&results=10`
    );

    const { results } = data;
    populateUI(results);
};


let handleLoad;

let trottleHandler = () => { throttle(handleLoad.call(this), 1000) };

document.addEventListener("DOMContentLoaded", () => {
    getData(1);
    window.addEventListener("scroll", trottleHandler);
});

handleLoad = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - pixel_offset) {
        page = page + 1;
        console.log("sinh ra số page " + page);
        if (page <= last_page) {
            window.removeEventListener('scroll', trottleHandler)
            console.log("sinh ra số page " + page);
            getData(page)
                .then((res) => {
                    window.addEventListener('scroll', trottleHandler)
                    console.log("sinh ra số page " + page);
                })
        }
    }
}







const populateUI = data => {
    const container = document.querySelector('.content');
    data &&
        data.length &&
        data
        .map((each, index) => {
            const { name, picture, location, registered } = each;
            const { first } = name;
            const { large } = picture;
            const { date } = registered;
            const { age } = registered;
            const { postcode } = location;
            let link = postcode - age;
            console.log(link);
            container.innerHTML +=
                `
                <div class="posts-main">

                <div class="post">
                    <div class="user-infor">
                        <img src="${large}" alt="">
                        <div>
                            <p>${first}</p>
                            <span>${date}</span>
                        </div>
                    </div>
                    <p class="status-user"> </p>
                    <div class="img-post">
                        <img src="https://source.unsplash.com/random/300x200?sig=${link}" alt="">
                    </div>

                    <div class="icon-react">
                        <div class="active-icon">
                            <div class="active-infor">
                                <i class="far fa-thumbs-up"></i>

                                <p id="count">0</p>
                            </div>
                            <div class="active-infor">
                                <p>1242 bình luận</p>
                                <p>42 chia sẻ</p>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="user-react">
                        <div class="actionn-1">
                            <span id="iconlike">  <i class="far fa-thumbs-up" style="font-size: 25px;"></i></span>
                            <p>Thích</p>
                        </div>
                        <div class="actionn-1">
                            <img src="./img/comments.png" alt="">
                            <p>bình luận</p>
                        </div>
                        <div class="actionn-1">
                            <img src="./img/share.png" alt="">
                            <p>chia sẻ</p>
                        </div>
                    </div>
                </div>


    `
        })

}