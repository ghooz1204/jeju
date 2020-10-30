import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loading from '../components/assets/Loading'

import { getShowDocument } from '../api/OnlineExhibitionAPI'

import PeoLeft from '../static/img/img_peo_left.png';
import PeoRight from '../static/img/img_peo_right.png';
import A4 from '../static/img/img_a4.jpg';
import CenterBooth from '../static/img/img_center_booth.png';

import ErrorImage from '../static/img/ic_check_on.png';

const OnlineExhibitionContainer = ({ viewId }) => {

    const URL = "http://14.63.174.102:84";

    const [booth, setBooth] = useState({})

    const language = useSelector(state => state.language.current);

    const [loading, setLoading] = useState(false);

    const showingDocument = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getShowDocument(viewId)
            setBooth(res)
        } catch (e) {
            alert('찾으시는 부스가 존재하지 않습니다.')
        }
        setLoading(false);
    }, [viewId])

    useEffect(() => {
        try {
            showingDocument();
        } catch (e) {
            alert('서버에 오류가 발생했습니다.');
        }
    }, [showingDocument]);

    const type = []
    if (booth.type === 0) {
        type.push('온라인 전시')
        type.push('Online-Exhibition')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 1) {
        type.push('음료,차류')
        type.push('Beverages/Tea')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 2) {
        type.push('전통식품')
        type.push('Traditional Foods')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 3) {
        type.push('가공식품')
        type.push('Processed Foods')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 4) {
        type.push('건강식품')
        type.push('Healthy Foods & supplements')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 5) {
        type.push('주류')
        type.push('Alcoholic drinks')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 6) {
        type.push('간식')
        type.push('Snacks')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 7) {
        type.push('화장품')
        type.push('Cosmetics')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 8) {
        type.push('천연염색')
        type.push('Dyed products')
        type.push('중국어')
        type.push('일본어')
    }
    else if (booth.type === 9) {
        type.push('마을공동체')
        type.push('Local community')
        type.push('중국어')
        type.push('일본어')
    }

    //--------------------------------------------------------------------------------------
    const LANGUAGE_PACK = {
        kr: {
            css: ""
        },
        en: {
            css: " language-en"
        },
        cn: {
            css: " language-cn"
        },
        jp: {
            css: " language-jp"
        }
    }

    const current_pack = LANGUAGE_PACK[language] ? LANGUAGE_PACK[language] : LANGUAGE_PACK["kr"]
    //--------------------------------------------------------------------------------------

    const vType = ["ASF", "AVI", "BIK", "FLV", "MKV", "MOV", "MP4", "MPEG", "Ogg", "SKM", "TS", "WebM", "WMV",
                    "asf", "avi", "bik", "flv", "mkv", "mov", "mp4", "mpeg", "ogg", "skm", "ts", "webm", "wmv"]

    // const [isVideo, SetisVideo] = useState(false)

    const videoType = (file, link) => {
        const FILE = new String(file)
        const LINK = new String(link)

        console.log(LINK)

        const dot = FILE.lastIndexOf('.')
        for(let i = 0; i < vType.length; i++){  //파일로 넘어오는 경우
            if(FILE.substring(dot + 1, FILE.length) === vType[i]){
                console.log("find")
                return <embed 
                src={URL + file}
                width="660"
                height="376"
                />
            }
        }

        if(LINK.lastIndexOf("embed") !== -1) {    //유튜브 embed링크로 넘어오는 경우
            return <iframe
            title="youtube"
            width="660"
            height="376"
            src={link} //비디오 링크가  cms에 추가하는 것이 없음
            alt=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        }
        else if(LINK.length !== 0){  //유튜브 링크로 넘어오는 경우
            return <a href={link} target="_blank" rel="noopener noreferrer" width="660" height="376" >VIDEO LINK</a>
        }
        else {  //파일, 링크 두 가지 다 없는 경우 => 
            return <img src={ErrorImage} alt="" width="660" height="376" />
        }
    }

    return (
        <section id="ex_container" className={current_pack.css}>
            {console.log(booth)}
            {!loading &&
                <>
                    <h2>{language === 'en' ? type[1]
                        : language === 'cn' ? type[2]
                            : language === 'jp' ? type[3]
                                : type[0]}ㅣ{booth.title}</h2>
                    <div className={"people" + current_pack.css}>
                        <span>
                            <img src={PeoLeft} alt="" />
                        </span>
                        <span>
                            <img src={PeoRight} alt="" />
                        </span>
                    </div>
                    <div className={"left" + current_pack.css}>
                        <img src={A4} alt="" />
                    </div>
                    <div className={"right" + current_pack.css}>
                        <img src={URL + booth.photo_2} alt="" />
                    </div>
                    <div className={"spot" + current_pack.css}>
                        <span>
                            <img src={CenterBooth} alt="" />
                        </span>
                        <div className={"center" + current_pack.css}>
                            {videoType(booth.file_1, booth.link)}
                        </div>
                        <button className={"buy" + current_pack.css} onClick={() => window.open(booth.link)}>
                            {language === 'en' ? "Purchase"
                                : language === 'cn' ? "중국어"
                                    : language === 'jp' ? "일본어"
                                        : "구매하러 가기"} {'>'}
                        </button>
                    </div>
                </>
            }

            <Loading open={loading} />
        </section>
    );
};

export default OnlineExhibitionContainer;