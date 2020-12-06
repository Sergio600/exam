function showOverlay() {
    let overLay = document.getElementsByClassName("overLay")[0];
    overLay.classList.remove("hidden");
}

function hideOverlay() {
    let overLay = document.getElementsByClassName("overLay")[0];
    overLay.classList.add("hidden");
    let elemInfo = document.getElementById("elementInfo");
    elemInfo.innerHTML = "";

}

function getDates() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: "http://68113b5b9e44.ngrok.io/video",
            success(data) {
                resolve(data);
            },
            error(err) {
                reject(err);
            }
        });
    });
}

getDates().then(
    //resolve
    (data) => {
        console.log(data);

        let container = $(".container")[0];

        for (let element of data) {

            let elementDiv = document.createElement('div');
            let div1 = document.createElement('div');
            let div2 = document.createElement('div');
            let div3 = document.createElement('div');
            let img = document.createElement('img')

            elementDiv.classList.add("elementDiv");
            div1.classList.add("div1");
            div2.classList.add("div2");
            div3.classList.add("div3");
            div3.style = ("color:gray");

            img.src = element.preview;
            div2.innerText = element.name;
            div3.innerText = translateTime(element.duration);

            div1.appendChild(img);
            elementDiv.appendChild(div1);
            elementDiv.appendChild(div2);
            elementDiv.appendChild(div3);

            // событие при нажатии на поле
            elementDiv.onclick = () => {

                function getVideo() {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            method: "GET",
                            url: `http://68113b5b9e44.ngrok.io/video/${element.id}`,
                            success(data1) {
                                resolve(data1);
                            },
                            error(err) {
                                reject(err);
                            }
                        });
                    });
                }

                getVideo().then(
                    //resolve
                    (data1) => {
                        console.log(data1);


                        let elementInfo = document.getElementById("elementInfo");

                        let video = document.createElement("video");
                        video.controls = true;
                        video.autoplay = true;
                        let source = document.createElement("source");
                        source.src = data1.url;
                        video.appendChild(source);

                        let divVideo = document.createElement('div');
                        let divName = document.createElement('div');
                        let divViews = document.createElement('div');

                        divVideo.appendChild(video);

                        divVideo.classList.add("divVideo");
                        divName.classList.add("divName");
                        divViews.classList.add("divViews");


                        divName.innerText = element.name;
                        divViews.innerText = "Просмотры: " + data1.viewCount;

                        elementInfo.appendChild(divVideo);
                        elementInfo.appendChild(divName);
                        elementInfo.appendChild(divViews);

                    },
                    //reject
                    (err) => {
                        console.log(err);
                    }
                );
                showOverlay();
            };
            container.appendChild(elementDiv);
        }
    },

    (err) => {
        console.log(err);
    }
);


function translateTime(seconds) {
    let min = Math.floor(seconds / 60);
    if (min < 10) {
        min = "0" + min;
    }
    let sec = seconds % 60;
    if (sec < 10) {
        sec = "0" + sec;
    }
    return (min + "m" + sec + "s");
}

console.log(translateTime(65));