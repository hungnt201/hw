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
    console.log(populateUI);
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

        if (page <= last_page) {
            window.removeEventListener('scroll', trottleHandler)

            getData(page)
                .then((res) => {
                    window.addEventListener('scroll', trottleHandler)

                })
        }
    }
}



const populateUI = data => {
    const container1 = document.querySelector('.contentpost');
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

            container1.innerHTML +=
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

                                <p id="count">${age}</p>
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


                        <span id="iconlike">  <i class="far fa-thumbs-up"></i></span>
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

//comment
function genQuote() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote').innerHTML = quotes[randNum];

}


let quotes = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment1
function genQuote1() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote1').innerHTML = quotes1[randNum];

}


let quotes1 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];

//comment2
function genQuote2() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote2').innerHTML = quotes2[randNum];

}


let quotes2 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment3
function genQuote3() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote3').innerHTML = quotes3[randNum];

}


let quotes3 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment4
function genQuote4() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote4').innerHTML = quotes4[randNum];

}


let quotes4 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment5
function genQuote5() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote5').innerHTML = quotes5[randNum];

}


let quotes5 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment6
function genQuote6() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote6').innerHTML = quotes6[randNum];

}


let quotes6 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment7
function genQuote7() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote7').innerHTML = quotes7[randNum];

}


let quotes7 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment8
function genQuote8() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote8').innerHTML = quotes8[randNum];

}


let quotes8 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];


//comment9
function genQuote9() {
    let randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote9').innerHTML = quotes9[randNum];

}


let quotes9 = ["Blank",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/57.jpg\"><div><div id=\"commentchat\">Linnea<br>Are you on the net</div> </div></div> <div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/83.jpg\"><div><div id=\"commentchat\">Josefina<br>I often chat online</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/90.jpg\"><div><div id=\"commentchat\">Benjamin<br>Do you often surf the internet?</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/34.jpg\"><div><div id=\"commentchat\">Irina<br>I have a desire to chat online in English.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/women/61.jpg\"><div><div id=\"commentchat\">Rose<br>I download movies and music from the net.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/85.jpg\"><div><div id=\"commentchat\">Jimmy<br>It’s just wasting time to chat online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/21.jpg\"><div><div id=\"commentchat\">Giovanni<br>Most teenagers are fascinated by chatting online.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
    "\<hr><div class=\"user-infor\"><img src=\"https://randomuser.me/api/portraits/men/66.jpg\"><div><div id=\"commentchat\">Clésio<br>You can get more information by surfing the internet.</div> </div></div><div class=\"status-input\"><img src=\"./img/user.jpg\"><input type=\"text\" placeholder=\"Viết bình luận công khai ...\"></div>",
];

//left
const listunder = document.getElementById("listunder");
const seemore = document.getElementById("btn-seemore");
const list1 = document.getElementById("list1");
const anbot = document.getElementById("btn-anbot");
seemore.onclick = function() {
    listunder.classList.toggle("check");
    seemore.remove();
};
anbot.onclick = function() {
    listunder.classList.toggle("check");
    list1.appendChild(seemore);
};

const listunder2 = document.getElementById("listunder2");
const seemore2 = document.getElementById("seemore2");
const anbot2 = document.getElementById("anbot2");
const list2 = document.getElementById("list2");
seemore2.onclick = function() {
    listunder2.classList.toggle("check");
    seemore2.remove();
};
anbot2.onclick = function() {
    listunder2.classList.toggle("check");
    list2.appendChild(seemore2);
};