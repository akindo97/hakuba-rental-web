import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button, Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { fpreso, xOpric, xKpric, setpre, fcvmny } from './Sgloba';
import im_ski from '../assets/items/ski.png';
import imsbot from '../assets/items/ski-boots.png';
import impole from '../assets/items/ski-poles.png';
import imboad from '../assets/items/board.png';
import imboot from '../assets/items/boot.png';
import imcoat from '../assets/items/raincoat.png';
import imsold from '../assets/items/soldier.png';
import imsled from '../assets/items/sled.png';
import imzipf from '../assets/items/zipfy.png';
import imrace from '../assets/items/racer.png';
import imshoe from '../assets/items/snowshoes.png';
import imskat from '../assets/items/skating.png';
import imstar from '../assets/items/star.png';
import imstas from '../assets/items/stars.png';
import imlvr1 from '../assets/icons/1.png';
import imlvr2 from '../assets/icons/2.png';
import imlvr3 from '../assets/icons/3.png';
import imregu from '../assets/icons/regular.png';
import imgoof from '../assets/icons/gooly.png';
import { el } from 'date-fns/locale';

function Fitems() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const xordin = [t('一人目'), t('二人目'), t('三人目'), t('四人目')];

    const location = 3;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // スキー || ファンス
    const [xskisl, setskisl] = useState(false);
    // SNOW SKAT : 1DAY || 4H
    const [xotska, setotska] = useState(false);
    // SNOW SHOE : 1DAY || 4H
    const [xotsho, setotsho] = useState(false);
    // SNOW RACER : 1DAY || 4H
    const [xotrac, setotrac] = useState(false);
    // SNOW ZIPFY : 1DAY || 4H
    const [xotzip, setotzip] = useState(false);

    // 長さと幅 - chiều dài và rộng - [width, height]
    const xblkhg = useRef(null);
    const [xdomhg, setdomhg] = useState([345, 460]);

    // 情報が表示される順序 - thứ tự thông tin đang hiển thị
    const [xuindx, setUindx] = useState(0);

    // animation
    const [xanima, setanima] = useState('');

    // 利用者情報 - thông tin người sử dụng
    const [xrtinf, setXrtinf] = useState(JSON.parse(localStorage.getItem("luseri")));
    console.log(xrtinf);

    // 人数 - số người
    const [xcount, setcount] = useState(fpreso(xrtinf));


    // ITEMS ルール
    const xirule = [
        // ["       　　", "ski", "boost", "pole", "board", "boost", "ウエア上", "ウエア下", "ヘルメット", "ソリ", "ZIPFY(スノードライブ)", "スノーレーザー(スノースクート)", "スノーシュー", "スノースケート"],
        /*ski         */[2, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        /*boost  　  　*/[1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        /*pole   　  　*/[1, 1, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        /*board  　  　*/[0, 0, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        /*boost  　　  */[0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
        /*ウエア上　   */[1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1],
        /*ウエア下　   */[1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
        /*ヘルメット　  */[1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        /*ソリ　　　　  */[0, 1, 0, 0, 1, 1, 1, 1, 3, 0, 0, 0, 0],
        /*スノードライブ*/[0, 1, 0, 0, 1, 1, 1, 1, 0, 3, 0, 0, 0],
        /*スノースクート*/[0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 3, 0, 0],
        /*スノーシュー  */[0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 3, 0],
        /*スノースケー  */[0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 3]
    ];

    const xOpric1 = {
        0.5: [2500, 1750, 1000, 2500, 1750, 2000, 2000, 500, 500, 1500, 2000, 1, 2000],
        1: [3500, 2500, 1000, 3500, 2500, 3000, 3000, 500, 500, 2000, 3500, 1, 3500], 
        1.5: [5500, 4000, 1500, 5500, 4000, 4500, 4500, 1000, 0, 0, 0, 1, 0], 
        2: [6500, 4500, 1500, 6500, 4500, 5500, 5500, 1000, 0, 0, 0, 1, 0], 
        2.5: [8500, 5500, 2000, 8500, 5500, 7000, 7000, 1500, 0, 0, 0, 1, 0], 
        3: [9500, 6500, 2000, 9500, 6500, 8000, 8000, 1500, 0, 0, 0, 1, 0], 
        4: [12000, 8000, 2500, 12000, 8000, 10000, 10000, 2000, 0, 0, 0, 1, 0], 
        5: [15000, 9000, 3000, 15000, 9000, 11000, 11000, 2500, 0, 0, 0, 1, 0], 
        6: [17000, 10000, 3500, 17000, 10000, 12000, 12000, 3000, 0, 0, 0, 1, 0], 
        7: [19000, 11000, 4000, 19000, 11000, 13000, 13000, 3500, 0, 0, 0, 1, 0], 
        8: [21000, 12000, 4500, 21000, 12000, 14000, 14000, 4000, 0, 0, 0, 1, 0]
    }

    const xKpric1 = {
        0.5: [2500, 1750, 1000, 2500, 1750, 2000, 2000, 500, 500, 1500, 2000, 1, 2000],
        1: [3500, 2500, 1000, 3500, 2500, 3000, 3000, 500, 500, 2000, 3500, 1, 3500], 
        1.5: [5500, 4000, 1500, 5500, 4000, 4500, 4500, 1000, 0, 0, 0, 1, 0], 
        2: [6500, 4500, 1500, 6500, 4500, 5500, 5500, 1000, 0, 0, 0, 1, 0], 
        2.5: [8500, 5500, 2000, 8500, 5500, 7000, 7000, 1500, 0, 0, 0, 1, 0], 
        3: [9500, 6500, 2000, 9500, 6500, 8000, 8000, 1500, 0, 0, 0, 1, 0], 
        4: [12000, 8000, 2500, 12000, 8000, 10000, 10000, 2000, 0, 0, 0, 1, 0], 
        5: [15000, 9000, 3000, 15000, 9000, 11000, 11000, 2500, 0, 0, 0, 1, 0], 
        6: [17000, 10000, 3500, 17000, 10000, 12000, 12000, 3000, 0, 0, 0, 1, 0], 
        7: [19000, 11000, 4000, 19000, 11000, 13000, 13000, 3500, 0, 0, 0, 1, 0], 
        8: [21000, 12000, 4500, 21000, 12000, 14000, 14000, 4000, 0, 0, 0, 1, 0]
    }

    // 
    const [nxpram, setnxpram] = useState(false);
    const [slanim, setlanim] = useState('');
    const langue = useSelector((state) => state.myReducer.lang);
    const homeid = useSelector((state) => state.myReducer.home);
    const nxprid = useSelector((state) => state.myReducer.nxpr);
    useEffect(() => {
        if (homeid == location && nxprid == 0) {
            setlanim('zin');
        } else if (nxprid == -1) {
            setlanim('fadeprev');
        } else if (nxprid == +1) {
            setlanim('fadenext');
        }
    }, []);

    // 言語変換 - thay đổi ngôn ngữ
    useEffect(() => {
        changeLanguage(langue);
    }, [langue]);

    // // 人数調査 - tìm số người
    // useEffect(() => {
    //     setcount(fpreso(xrtinf));
    // }, [])

    // set
    const setval = (e, idx) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        console.log(fieldName, fieldValue);
        setXrtinf((prevXrtinf) => ({
            ...prevXrtinf,
            [idx]: {
                ...prevXrtinf[idx],
                xitems: {
                    ...prevXrtinf[idx].xitems,
                    [fieldName]: fieldValue
                }
            }
        }));
    };

    // set 2
    const setsie = (idx, fieldName, fieldValue) => {
        setXrtinf((prevXrtinf) => ({
            ...prevXrtinf,
            [idx]: {
                ...prevXrtinf[idx],
                xitems: {
                    ...prevXrtinf[idx].xitems,
                    [fieldName]: fieldValue
                }
            }
        }));
    }

    // 貸出期間 - thời gian thuê
    // const period = (e, idx) => {
    //     let daysDiff = 0;
    //     setval(e, idx);
    //     if (e.target.name == "istart" && !xrtinf[idx].xitems.i__end) {
    //         setsie(idx, 'i__end', e.target.value);
    //         setsie(idx, 'isampm', 1);
    //         setsie(idx, 'ieampm', 2);
    //         daysDiff = 1;
    //     } else {
    //         if (e.target.name == "istart") {
    //             daysDiff = Math.floor(((new Date(xrtinf[idx].xitems.i__end) - new Date(e.target.value)) / (24 * 60 * 60 * 1000)) + 1);
    //         } else if (e.target.name == "i__end") {
    //             daysDiff = Math.floor(((new Date(e.target.value) - new Date(xrtinf[idx].xitems.istart)) / (24 * 60 * 60 * 1000)) + 1);
    //         }
    //     }
    //     // if(xrtinf[xuindx].xitems.istart && xrtinf[xuindx].xitems.i__end && xrtinf[xuindx].xitems.isampm && xrtinf[xuindx].xitems.ieampm) {
    //     //     if(xrtinf[idx].xitems.i__day > 0) {
    //     //         daysDiff = (xrtinf[idx].xitems.ieampm - xrtinf[idx].xitems.isampm) == 0 ? xrtinf[idx].xitems.i__day - 0.5 : xrtinf[idx].xitems.i__day;
    //     //     } else {
    //     //         daysDiff = (xrtinf[idx].xitems.ieampm - xrtinf[idx].xitems.isampm) == 0 ? daysDiff - 0.5 : daysDiff;
    //     //     }
    //     // }
    //     if (xuindx == 0) {
    //         for (let i = 0; i < xcount; i++) {
    //             //　代表者場合全員同じ貸出期間になってる。
    //             setsie(i, 'i__day', daysDiff);
    //             if (i != 0) {
    //                 if (e.target.name == "istart") {
    //                     setsie(i, 'istart', e.target.value);
    //                 } else if (e.target.name == "i__end") {
    //                     setsie(i, 'i__end', e.target.value);
    //                 }
    //             }
    //         }
    //     } else {
    //         setsie(idx, 'i__day', daysDiff);
    //     }
    //     localStorage.setItem("lterms", [0, ""]);
    // }
    useEffect(() => {
        let daysDiff = 0;
        if (xrtinf[xuindx].xitems.istart && !xrtinf[xuindx].xitems.i__end) {
            setsie(xuindx, 'i__end', xrtinf[xuindx].xitems.istart);
            setsie(xuindx, 'isampm', 1);
            setsie(xuindx, 'ieampm', 2);
            daysDiff = 1;
        } else if (xrtinf[xuindx].xitems.istart && xrtinf[xuindx].xitems.i__end && xrtinf[xuindx].xitems.isampm && xrtinf[xuindx].xitems.ieampm) {
            daysDiff = Math.floor(((new Date(xrtinf[xuindx].xitems.i__end) - new Date(xrtinf[xuindx].xitems.istart)) / (24 * 60 * 60 * 1000)) + 1);
            if(daysDiff < 3) {
                daysDiff -= (xrtinf[xuindx].xitems.ieampm - xrtinf[xuindx].xitems.isampm) == 0 ? 0.5 : 0;
            }
        }

        setsie(xuindx, 'i__day', daysDiff);

        if (xuindx == 0) {
            for (let i = 0; i < xcount; i++) {
                //　代表者場合全員同じ貸出期間になってる。
                if (i != 0 && xrtinf[i].xitems.i__day == 0) {
                    setsie(i, 'istart', xrtinf[0].xitems.istart);
                    setsie(i, 'i__end', xrtinf[0].xitems.i__end);
                    setsie(i, 'isampm', xrtinf[0].xitems.isampm);
                    setsie(i, 'ieampm', xrtinf[0].xitems.ieampm);
                    setsie(i, 'i__day', xrtinf[0].xitems.i__day);
                }
            }
        }

        // 価格再計算
        for (let i = 0; i < xcount; i++) {
            if (xrtinf[i].xitems.isitem != '000000000000') {
                hdrule(false, i);
            }
        }

        localStorage.setItem("lterms", [0, ""]);
    }, [xrtinf[xuindx].xitems.istart,
    xrtinf[xuindx].xitems.i__end,
    xrtinf[xuindx].xitems.isampm,
    xrtinf[xuindx].xitems.ieampm,
        xcount])

    // ルール
    const hdrule = (e, xindex, itemid, specia) => {
        const xuseri = xrtinf[xindex].xuseri
        const xitems = xrtinf[xindex].xitems;
        let xsitem = xitems.isitem;
        xsitem = xsitem.split('');
        if (e !== false) {
            xsitem[itemid] = e.target.checked ? (specia ? specia : 1) : 0;
            for (var i = 0; i < xirule[itemid].length; i++) {
                if (xirule[itemid][i] === 0) {
                    xsitem[i] = 0;
                }
            }
        }

        // ２日以上
        if (xitems.i__day > 1) {
            for (let k = 0; k < xirule.length; k++) {
                for (var i = 0; i < xirule[k].length; i++) {
                    // SLED, ZIPFY, SNOW RACER, SNOW SHOE, SNOW SKAT　の　場合
                    if (xirule[k][i] === 3) {
                        xsitem[i] = 0;
                    }
                }
            }
        }

        // 価格計算
        let xsubpr = 0;
        let itract = 0;
        const xprice = xuseri.clsify == 1 ? xOpric : xKpric; // 大人 ?? 子供 ??
        for (var i = 0; i < xsitem.length; i++) {
            if (xsitem[i] != 0) {
                // // 普通 ファンス ２H || ４H || 1日
                xsubpr += xprice[xsitem[i] - 1][i] * xitems.i__day;
            }
        }

        // セットチェック
        for (const key in setpre) {
            if (setpre.hasOwnProperty(key)) {
                const xvlset = setpre[key];
                let isetis = xvlset.isitem; // 000000000000
                let setchk = true; // セットある？
                isetis = isetis.split('');
                isetis.forEach((xvchar, xvlidx) => {
                    if (xvchar != 0) {
                        if (xvchar != xsitem[xvlidx]) {
                            setchk = false;
                        }
                    }
                });

                if (setchk && !itract) {
                    // セット場合
                    console.log("SET")
                    itract = xvlset.itract * xitems.i__day;
                }
            }
        }
        setsie(xindex, 'isubtl', xsubpr - itract);

        // 日チェック
        if (xitems.i__day <= 0 || xitems.i__day > 5) {
            dispatch({ type: 'MODAL', payload: [1, t('NM0020')] });
            setsie(xindex, 'isubtl', 0);
        }

        // スキーヤー　レベル と　スキーヤー　レベル　reset
        if (xsitem[0] == 0 && xsitem[3] == 0 && xitems.ilevel != 0) {
            setsie(xindex, 'ilevel', 0);
        }
        if (xsitem[3] == 0 && xsitem[0] != 0 && xitems.istanc != 0) {
            setsie(xindex, 'istanc', 0);
        }

        // 集める - gom lại
        xsitem = xsitem.join('');
        console.log(xsitem);
        setsie(xindex, 'isitem', xsitem);

        setskisl(false);
        setotska(false);
        setotsho(false);
        setotrac(false);
        setotzip(false);

    }

    // itemsブロックの高さを取得する - lấy chiều cao của block nhập items
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (xblkhg.current) {
                const element = ReactDOM.findDOMNode(xblkhg.current);
                setdomhg([element.offsetWidth, element.offsetHeight]);
                console.log([element.offsetWidth, element.offsetHeight]);
            }
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [xblkhg]);

    // 2人目以降の日程を微調整します -  tinh chỉnh ngày cho người thứ 2 trở đi
    // useEffect(() => {
    //     if (xuindx > 0) {
    //         const xitems = xrtinf[xuindx].xitems;
    //         if (xitems.i__day == 0) {
    //             console.log("V")
    //             setsie(xuindx, 'istart', xrtinf[0].xitems.istart);
    //             setsie(xuindx, 'i__end', xrtinf[0].xitems.i__end);
    //             setsie(xuindx, 'i__end', xrtinf[0].xitems.i__day);
    //         }
    //     }
    // }, [xuindx])

    // 再計算
    useEffect(() => {
        // 価格再計算
        for (let i = 0; i < xcount; i++) {
            if (xrtinf[i].xitems.isitem != '000000000000') {
                hdrule(false, i);
            }
        }
    }, []);

    // チェック
    const itechk = (xrtinf) => {
        let xresul = 0;
        for (let i = 0; i < xcount; i++) {
            const xitems = xrtinf[i].xitems;
            // 貸出期間チェック
            if (xitems.i__day <= 0 || xitems.i__day > 5) {
                dispatch({ type: 'MODAL', payload: [1, `${xordin[i]}${t('の')}` + t('NM0020')] });
                xresul = i + 1;
                break;
            }

            // 期限日チェック
            if (new Date() > new Date(`${xitems.istart} 23:59:59`)) {
                dispatch({ type: 'MODAL', payload: [1, `${xordin[i]}${t('の')}` + t('NM0025')] });
                xresul = i + 1;
                break;
            }

            // 貸出期間チェック
            if (xitems.isitem == '000000000000') {
                dispatch({ type: 'MODAL', payload: [1, `${xordin[i]}${t('の')}` + t('NM0021')] });
                xresul = i + 1;
                break;
            }
            // スキーヤー　レベル と　スキーヤー　レベル チェック
            if (xitems.isitem[0] != 0 && xitems.ilevel == 0) {
                dispatch({ type: 'MODAL', payload: [1, `${xordin[i]}${t('の')}` + t('NM0022')] });
                xresul = i + 1;
                break;
            }
            if (xitems.isitem[3] != 0) {
                if (xitems.ilevel == 0) {
                    dispatch({ type: 'MODAL', payload: [1, `${xordin[i]}${t('の')}` + t('NM0022')] });
                    xresul = i + 1;
                    break;
                }
                if (xitems.istanc == 0) {
                    dispatch({ type: 'MODAL', payload: [1, `${xordin[i]}${t('の')}` + t('NM0023')] });
                    xresul = i + 1;
                    break;
                }
            }
        }
        return xresul;
    }


    // 戻る
    const fprevi = () => {
        dispatch({ type: 'NXPRID', payload: -1 });
        if (homeid == location) {
            setlanim('zin');
            setnxpram(false);
            setTimeout(() => {
                window.history.back();
            }, 200);
        } else {
            window.history.back();
        }
    }

    //　次へボタン
    const fconti = () => {
        const xchker = itechk(xrtinf);
        if (xchker === 0) {
            localStorage.setItem("luseri", JSON.stringify(xrtinf));
            dispatch({ type: 'NXPRID', payload: +1 });
            navigate('/qrshow');
        }
    }

    useEffect(() => {
        setnxpram(true);
    }, []);
    return (
        <>
            <CSSTransition in={nxpram} timeout={300} classNames={slanim} unmountOnExit >
                <div className='position-fixed start-0 top-0 bottom-0 end-0 vh-100 pb-5 overflow-auto'>
                    <div className="text-center mt-5 pt-2 fs-5 fw-blod bg-light">
                        {t('レンタル品選択')}
                    </div>

                    <Container className="mt-2 pb-5">
                        <div className='border border-dark'>
                            <div className='d-flex'>
                                <div className='d-flex iflex1 p-1'>
                                    <div className='iflex1'>
                                        <div className='inames' style={{ width: `${xdomhg[0] - 185}px` }}>{t('利用者')}　：{xrtinf[xuindx].xuseri.ukfnam + xrtinf[xuindx].xuseri.uklnam}</div>
                                        <div className=''>{t('貸出期間')}：{xrtinf[xuindx].xitems.i__day} {t('日')}</div>
                                    </div>
                                    <div className='' style={{ width: '6.9em' }}>
                                        <div className=''>{t('区別')}：{xrtinf[xuindx].xuseri.clsify == 1 ? t('大人') : t('子供')}</div>
                                        <div className=''>{t('小計')}：¥{fcvmny(xrtinf[xuindx].xitems.isubtl)}</div>
                                    </div>
                                </div>
                                <div className='border-start border-bottom border-dark p-1' style={{ width: '4.2em' }}>
                                    <div className=''>{t('合計')}</div>
                                    <div className=''>¥{fcvmny(Object.values(xrtinf).reduce((acc, item) => acc + item.xitems.isubtl, 0))}</div>
                                </div>
                            </div>
                            <div className='mt-2'></div>
                            <div className='d-flex' style={{ height: 0 }}>
                                <div className='' style={{ flex: 1 }}><div className='dlabel'>{t('開始日')}</div></div>
                                <div className='' style={{ flex: 1 }}><div className='dlabel'>{t('返却日')}</div></div>
                            </div>
                            <div className='d-flex p-1'>
                                <Form.Control type="date" min={new Date().toISOString().split('T')[xuindx]} className='me-1 text-center' name="istart"
                                    // onChange={(e) => { period(e, xuindx) }} value={xrtinf[xuindx].xitems.istart ? xrtinf[xuindx].xitems.istart : undefined} required />
                                    onChange={(e) => { setval(e, xuindx) }} value={xrtinf[xuindx].xitems.istart ? xrtinf[xuindx].xitems.istart : undefined} required />
                                <Form.Control type="date" className='ms-1 text-center' name='i__end'
                                    min={new Date().toISOString().split('T')[xuindx]}
                                    max={xrtinf[xuindx].xitems.istart ? new Date(new Date(xrtinf[xuindx].xitems.istart).setDate(new Date().getDate() + 5)).toISOString().split('T')[xuindx] : undefined}
                                    onChange={(e) => { setval(e, xuindx) }} value={xrtinf[xuindx].xitems.i__end ? xrtinf[xuindx].xitems.i__end : undefined} required />
                            </div>
                            <div className='d-flex justify-content-between p-1' style={{ marginTop: '-0.2em' }}>
                                <div className='d-flex justify-content-between iflex1'>
                                    <Button className='py-0 iflex1' variant={xrtinf[xuindx].xitems.isampm == 1 ? 'primary' : 'outline-secondary'} value={1} name='isampm'
                                        onClick={(e) => setval(e, xuindx)} >AM</Button>{' '}
                                    <Button className='py-0 ms-2 iflex1' variant={xrtinf[xuindx].xitems.isampm == 2 ? 'primary' : 'outline-secondary'} value={2} name='isampm'
                                        onClick={(e) => setval(e, xuindx)} >PM</Button>{' '}
                                </div>
                                <div className='d-flex justify-content-between iflex1 ps-3'>
                                    <Button className='py-0 iflex1' variant={xrtinf[xuindx].xitems.ieampm == 1 ? 'primary' : 'outline-secondary'} value={1} name='ieampm'
                                        onClick={(e) => setval(e, xuindx)} >AM</Button>{' '}
                                    <Button className='py-0 ms-2 iflex1' variant={xrtinf[xuindx].xitems.ieampm == 2 ? 'primary' : 'outline-secondary'} value={2} name='ieampm'
                                        onClick={(e) => setval(e, xuindx)} >PM</Button>{' '}
                                </div>
                            </div>
                        </div>
                        {xcount > 1 ?
                            <div className='d-flex my-1 border fs-5 bg-light'>
                                <div className={`iflex1 text-start ps-1 isprev ${xuindx == 0 ? 'invisible' : ''}`}
                                    onClick={() => { setUindx(xuindx - 1); setanima('fadeprev'); }}>＜{t('前の人')}</div>
                                <div className='iflex1 text-center'>{xordin[xuindx]}</div>
                                <div className={`iflex1 text-end pe-1 isnext ${xuindx == xcount - 1 ? 'invisible' : ''}`}
                                    onClick={() => { setUindx(xuindx + 1); setanima('fadenext'); }}>{t('次の人')} ＞</div>
                            </div>
                            : ''
                        }
                        <div className='d-flex'>
                            {xcount > 1 ?
                                (
                                    Array.from({ length: xcount }, (_, index) => (
                                        <div key={index} className={`iflex1 text-center ${xuindx === index ? 'bg-white ibrode' : 'ibgrou text-white'}`}
                                            onClick={() => { setUindx(index); (index > xuindx ? setanima('fadenext') : setanima('fadeprev')) }} >
                                            {index + 1}
                                        </div>
                                    ))
                                )
                                : ''
                            }
                        </div>

                        <div className='border border-dark border-top-0' style={{ overflowX: 'hidden' }}>
                            <div className='fw-bold px-1'>{t('レンタル種目')}</div>
                            <div className='position-relative' style={{ height: `${xdomhg[1]}px` }}>
                                {Array.from({ length: xcount }, (_, index) => {
                                    const xuseri = xrtinf[index].xuseri;
                                    const xitems = xrtinf[index].xitems;
                                    const isitem = xitems.isitem;
                                    return (
                                        <CSSTransition key={index} in={xuindx === index}
                                            timeout={300} classNames={xanima} unmountOnExit >
                                            <div className='position-absolute start-0 end-0' ref={index == 0 ? xblkhg : null}>
                                                <div className='p-1'>
                                                    {/* 1111111111 */}
                                                    <div className='d-flex mt-2'>
                                                        <div className='iflex1'>
                                                            <div className='itconn'>SKI</div>
                                                            <div className='iibral'></div>
                                                            <div className='d-flex icontn pt-1 crossed'>
                                                                スキー
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='position-relative if07em'>
                                                                <div className={`d-flex justify-content-center align-items-end pb-1 ${xskisl ? 'invisible' : ''}`}>
                                                                    <img src={im_ski} />
                                                                    <div className='ps-1'>SKI</div>
                                                                </div>
                                                                <CSSTransition in={xskisl} timeout={300} classNames='itemsshow' unmountOnExit >
                                                                    <img className='position-absolute bg-white' src={im_ski} style={{ zIndex: 1, left: '50%', marginLeft: '-16px', marginTop: '-5px' }} />
                                                                </CSSTransition>
                                                                <CSSTransition in={xskisl} timeout={300} classNames='itemsiconl' unmountOnExit >
                                                                    <div className='position-absolute' style={{ top: 0, left: '-0.3em' }}>
                                                                        <label className='d-grid ilbope' htmlFor='123' >スキー</label>
                                                                        <input type='radio' className='iradio' name='123' id='123' onChange={(e) => hdrule(e, index, 0, 1)}
                                                                            checked={isitem[0] === '1' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                                <CSSTransition in={xskisl} timeout={300} classNames='itemsiconr' unmountOnExit >
                                                                    <div className='position-absolute' style={{ top: 0, right: '-1.3em ' }}>
                                                                        <label className='d-grid ilbope'>ファンスキー</label>
                                                                        <input type='radio' className='iradio' name='123' onChange={(e) => hdrule(e, index, 0, 2)}
                                                                            checked={isitem[0] === '2' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065 position-relative'>
                                                                <label className={`ichklb ${xskisl ? 'invisible' : ''}`}>
                                                                    <input type='checkbox' className='ichekb' name=''
                                                                        onChange={(e) => xuseri.clsify == 2 || !e.target.checked ? hdrule(e, index, 0) : setskisl(!xskisl)}
                                                                        checked={isitem[0] != 0 ? true : false} />

                                                                </label>
                                                                <div className='if07em ifdelt'>{isitem[0] != 0 ? (isitem[0] == 1 ? 'スキー' : 'ファンスキー') : ''}</div>
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={imsbot} />
                                                                <div className='ps-1 if07em'>BOOTS</div>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 1)}
                                                                        checked={isitem[1] == 1 ? true : false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={impole} />
                                                                <div className='ps-1 text-start if07em'>
                                                                    <div style={{ marginBottom: '-0.5em' }}>SKI</div>
                                                                    <div>POLE</div>
                                                                </div>
                                                            </div>
                                                            <div className='iibrcl iwdt50'></div>
                                                            <div className='if-065'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 2)}
                                                                        checked={isitem[2] == 1 || isitem[10] != 0 ? true : false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 2222222222 */}
                                                    <div className='d-flex mt-2'>
                                                        <div className='iflex1'>
                                                            <div className='itconn'>SNOW BOARD</div>
                                                            <div className='iibral'></div>
                                                            <div className='d-flex icontn pt-1 crossed'>
                                                                スノーボード
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={imboad} />
                                                                <div className='ps-1 text-start if07em'>
                                                                    <div style={{ marginBottom: '-0.5em' }}>SNOW</div>
                                                                    <div>BOARD</div>
                                                                </div>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 3)}
                                                                        checked={isitem[3] == 1 ? true : false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={imboot} />
                                                                <div className='ps-1 if07em'>BOOTS</div>
                                                            </div>
                                                            <div className='iibrcl iwdt50'></div>
                                                            <div className='if-065'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 4)}
                                                                        checked={isitem[4] == 1 ? true : false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 3333333333 */}
                                                    <div className='d-flex mt-2'>
                                                        <div className='iflex1'>
                                                            <div className='itconn'>OTHER</div>
                                                            <div className='iibral'></div>
                                                            <div className='d-flex icontn pt-1 crossed'>
                                                                その他
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={imcoat} />
                                                                <div className='ps-1 text-start if07em'>
                                                                    <div style={{ marginBottom: '-0.5em' }}>JACKET</div>
                                                                    <div>& PANTS</div>
                                                                </div>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 5)}
                                                                        checked={isitem[5] == 1 ? true : false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={imsold} />
                                                                <div className='ps-1 if07em'>HELMET</div>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 6)}
                                                                        checked={isitem[6] == 1 ? true : false} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className={`iflex1 text-center ${xitems.i__day > 1 ? 'noeven' : ''}`}>
                                                            <div className='d-flex justify-content-center align-items-end pb-1'>
                                                                <img src={imsled} />
                                                                <div className='ps-1 text-start if07em'>
                                                                    SLED
                                                                </div>
                                                            </div>
                                                            <div className='iibrcl iwdt95'></div>
                                                            <div className='if-065 position-relative'>
                                                                <label className='ichklb'>
                                                                    <input type='checkbox' className='ichekb' name='' onChange={(e) => hdrule(e, index, 7, 2)}
                                                                        checked={isitem[7] == 2 ? true : false} />
                                                                </label>
                                                                <div className='if07em iodelt'>{(isitem[7] == 2 ? '1日' : '')}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='position-relative'>
                                                        <div className='position-absolute icross'>

                                                        </div>
                                                    </div>

                                                    {/* 4444444444 */}
                                                    <div className={`d-flex mt-2 ${xitems.i__day > 1 ? 'noeven' : ''}`} >
                                                        <div className='iflex1 text-center'>
                                                            <div className='position-relative if07em'>
                                                                <div className={`d-flex justify-content-center align-items-end pb-1 ${xotzip ? 'invisible' : ''}`}>
                                                                    <img className='iicons' src={imzipf} />
                                                                    <div className='ps-1'>ZIPFY</div>
                                                                </div>
                                                                <CSSTransition in={xotzip} timeout={300} classNames='itemsshow' unmountOnExit >
                                                                    <img className='position-absolute bg-white' src={imzipf} style={{ zIndex: 1, left: '50%', marginLeft: '-16px', marginTop: '-5px' }} />
                                                                </CSSTransition>
                                                                <CSSTransition in={xotzip} timeout={300} classNames='itemsiconl' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ left: '10%' }}>
                                                                        <label className='d-grid ilbope' htmlFor='zipfy1' >1日</label>
                                                                        <input type='radio' className='iradio' name='zipfy' id='zipfy1' onChange={(e) => hdrule(e, index, 8, 2)}
                                                                            checked={isitem[8] === '1' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                                <CSSTransition in={xotzip} timeout={300} classNames='itemsiconr' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ right: '10%' }} >
                                                                        <label className='d-grid ilbope' htmlFor='zipfy2'>4H</label>
                                                                        <input type='radio' className='iradio' name='zipfy' id='zipfy2' onChange={(e) => hdrule(e, index, 8, 3)}
                                                                            checked={isitem[8] === '2' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                            </div>
                                                            <div className='d-flex justify-content-end'>
                                                                <div className='iibrcl iwdt50'></div>
                                                            </div>
                                                            <div className='if-065 position-relative'>
                                                                <label className={`ichklb ${xotzip ? 'invisible' : ''}`}>
                                                                    <input type='checkbox' className='ichekb' name=''
                                                                        onChange={(e) => !e.target.checked ? hdrule(e, index, 8) : setotzip(!xotzip)}
                                                                        checked={isitem[8] != 0 ? true : false} />
                                                                </label>
                                                                <div className='if07em iodelt'>{(isitem[8] == 2 ? '1日' : '')}{(isitem[8] == 3 ? '4H' : '')}</div>
                                                            </div>

                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='position-relative if07em'>
                                                                <div className={`d-flex justify-content-center align-items-end pb-1 ${xotrac ? 'invisible' : ''}`}>
                                                                    <img src={imrace} />
                                                                    <div className='ps-1 text-start'>
                                                                        <div style={{ marginBottom: '-0.5em' }}>SNOW</div>
                                                                        <div>RACER</div>
                                                                    </div>
                                                                </div>
                                                                <CSSTransition in={xotrac} timeout={300} classNames='itemsshow' unmountOnExit >
                                                                    <img className='position-absolute bg-white' src={imrace} style={{ zIndex: 1, left: '50%', marginLeft: '-16px', marginTop: '-5px' }} />
                                                                </CSSTransition>
                                                                <CSSTransition in={xotrac} timeout={300} classNames='itemsiconl' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ left: '10%' }}>
                                                                        <label className='d-grid ilbope' htmlFor='racer1' >1日</label>
                                                                        <input type='radio' className='iradio' name='racer' id='racer1' onChange={(e) => hdrule(e, index, 9, 2)}
                                                                            checked={isitem[9] === '1' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                                <CSSTransition in={xotrac} timeout={300} classNames='itemsiconr' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ right: '10%' }} >
                                                                        <label className='d-grid ilbope' htmlFor='racer2' >2H</label>
                                                                        <input type='radio' className='iradio' name='racer' id='racer2' onChange={(e) => hdrule(e, index, 9, 4)}
                                                                            checked={isitem[9] === '2' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065 position-relative'>
                                                                <label className={`ichklb ${xotrac ? 'invisible' : ''}`} >
                                                                    <input type='checkbox' className='ichekb' name=''
                                                                        onChange={(e) => !e.target.checked ? hdrule(e, index, 9) : setotrac(!xotrac)}
                                                                        checked={isitem[9] != 0 ? true : false} />
                                                                </label>
                                                                <div className='if07em iodelt'>{(isitem[9] == 2 ? '1日' : '')}{(isitem[9] == 4 ? '2H' : '')}</div>
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='position-relative if07em'>
                                                                <div className={`d-flex justify-content-center align-items-end pb-1 ${xotsho ? 'invisible' : ''}`}>
                                                                    <img src={imshoe} />
                                                                    <div className='ps-1 text-start'>
                                                                        <div style={{ marginBottom: '-0.5em' }}>SNOW</div>
                                                                        <div>SHOE</div>
                                                                    </div>
                                                                </div>
                                                                <CSSTransition in={xotsho} timeout={300} classNames='itemsshow' unmountOnExit >
                                                                    <img className='position-absolute bg-white' src={imshoe} style={{ zIndex: 1, left: '50%', marginLeft: '-16px', marginTop: '-5px' }} />
                                                                </CSSTransition>
                                                                <CSSTransition in={xotsho} timeout={300} classNames='itemsiconl' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ left: '10%' }}>
                                                                        <label className='d-grid ilbope' htmlFor='shoe1' >1日</label>
                                                                        <input type='radio' className='iradio' name='shoe' id='shoe1' onChange={(e) => hdrule(e, index, 10, 2)}
                                                                            checked={isitem[10] === '1' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                                <CSSTransition in={xotsho} timeout={300} classNames='itemsiconr' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ right: '10%' }} >
                                                                        <label className='d-grid ilbope' htmlFor='shoe2' >4H</label>
                                                                        <input type='radio' className='iradio' name='shoe' id='shoe2' onChange={(e) => hdrule(e, index, 10, 3)}
                                                                            checked={isitem[10] === '2' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                            </div>
                                                            <div className='iibrcl'></div>
                                                            <div className='if-065 position-relative'>
                                                                <label className={`ichklb ${xotsho ? 'invisible' : ''}`}>
                                                                    <input type='checkbox' className='ichekb' name=''
                                                                        onChange={(e) => !e.target.checked ? hdrule(e, index, 10) : setotsho(!xotsho)}
                                                                        checked={isitem[10] != 0 ? true : false} />
                                                                </label>
                                                                <div className='if07em iodelt'>{(isitem[10] == 2 ? '1日' : '')}{(isitem[10] == 3 ? '4H' : '')}</div>
                                                            </div>
                                                        </div>
                                                        <div className='iflex1 text-center'>
                                                            <div className='position-relative if07em'>
                                                                <div className={`d-flex justify-content-center align-items-end pb-1 ${xotska ? 'invisible' : ''}`}>
                                                                    <img src={imskat} />
                                                                    <div className='ps-1 text-start'>
                                                                        <div style={{ marginBottom: '-0.5em' }}>SNOW</div>
                                                                        <div>SKAT</div>
                                                                    </div>
                                                                </div>
                                                                <CSSTransition in={xotska} timeout={300} classNames='itemsshow' unmountOnExit >
                                                                    <img className='position-absolute bg-white' src={imskat} style={{ zIndex: 1, left: '50%', marginLeft: '-16px', marginTop: '-5px' }} />
                                                                </CSSTransition>
                                                                <CSSTransition in={xotska} timeout={300} classNames='itemsiconl' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ left: '10%' }}>
                                                                        <label className='d-grid ilbope' htmlFor='skat1' >2H</label>
                                                                        <input type='radio' className='iradio' name='skat' id='skat1' onChange={(e) => hdrule(e, index, 11, 4)}
                                                                            checked={isitem[11] === '1' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                                <CSSTransition in={xotska} timeout={300} classNames='itemsiconr' unmountOnExit >
                                                                    <div className='position-absolute top-0' style={{ right: '10%' }} >
                                                                        <label className='d-grid ilbope' htmlFor='skat2' >4H</label>
                                                                        <input type='radio' className='iradio' name='skat' id='skat2' onChange={(e) => hdrule(e, index, 11, 3)}
                                                                            checked={isitem[11] === '2' ? true : false} />
                                                                    </div>
                                                                </CSSTransition>
                                                            </div>
                                                            <div className='iibrcl iwdt95'></div>
                                                            <div className='if-065 position-relative'>
                                                                <label className={`ichklb ${xotska ? 'invisible' : ''}`}>
                                                                    <input type='checkbox' className='ichekb' name=''
                                                                        onChange={(e) => !e.target.checked ? hdrule(e, index, 11) : setotska(!xotska)}
                                                                        checked={isitem[11] != 0 ? true : false} />
                                                                </label>
                                                                <div className='if07em iodelt'>{(isitem[11] == 3 ? '4H' : '')}{(isitem[11] == 4 ? '2H' : '')}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 余分な */}
                                                <div className='border-top border-dark d-flex'>
                                                    <div className={`p-1 ${isitem[0] != 0 || isitem[3] != 0 ? '' : 'iopaci'}`} style={{ flex: 1 }}>
                                                        <div className='if09em'>{t('スキーヤーレベル')}</div>
                                                        <div className='d-flex align-items-end w-100' style={{ height: '4em' }}>
                                                            <div className='text-center' style={{ width: '32px' }}>
                                                                <img src={imstar} />
                                                            </div>
                                                            <div className='h-100' style={{ flex: 1 }} onClick={() => setsie(index, 'ilevel', 1)}>
                                                                <img className='w-100 h-100' src={imlvr1} style={{ backgroundColor: `${xitems.ilevel === 1 ? 'rgb(0, 153, 255)' : '#eee8e8'}` }} />
                                                            </div>
                                                            <div className='h-100' style={{ flex: 1 }} onClick={() => setsie(index, 'ilevel', 2)}>
                                                                <img className='w-100 h-100' src={imlvr2} style={{ backgroundColor: `${xitems.ilevel === 2 ? 'rgb(0, 153, 255)' : '#eee8e8'}` }} />
                                                            </div>
                                                            <div className='h-100' style={{ flex: 1 }} onClick={() => setsie(index, 'ilevel', 3)}>
                                                                <img className='w-100 h-100' src={imlvr3} style={{ backgroundColor: `${xitems.ilevel === 3 ? 'rgb(0, 153, 255)' : '#eee8e8'}` }} />
                                                            </div>
                                                            <div>
                                                                <img src={imstas} />
                                                            </div>
                                                        </div>
                                                        <div className='d-flex align-items-end w-100'>
                                                            <div className='text-center' style={{ width: '32px' }}>{t('初級')}</div>
                                                            <div className='h-100 if07em text-center' style={{ flex: 1 }}>
                                                                <input type='radio' className='iradio' name='ilevel' id='' checked={xitems.ilevel === 1 ? true : false}
                                                                    onChange={() => setsie(index, 'ilevel', 1)} />
                                                            </div>
                                                            <div className='h-100 if07em text-center' style={{ flex: 1 }}>
                                                                <input type='radio' className='iradio' name='ilevel' id='' checked={xitems.ilevel === 2 ? true : false}
                                                                    onChange={() => setsie(index, 'ilevel', 2)} />
                                                            </div>
                                                            <div className='h-100 if07em text-center' style={{ flex: 1 }}>
                                                                <input type='radio' className='iradio' name='ilevel' id='' checked={xitems.ilevel === 3 ? true : false}
                                                                    onChange={() => setsie(index, 'ilevel', 3)} />
                                                            </div>
                                                            <div className='text-center'>{t('上級')}</div>
                                                        </div>
                                                    </div>
                                                    <div className={`border-start border-dark p-1 ${isitem[3] != 0 ? '' : 'iopaci'}`} style={{ flex: 1 }}>
                                                        <div className='if09em'>{t('スノーボードスタンス')}</div>
                                                        <div className='d-flex'>
                                                            <div className='text-center' style={{ flex: 1 }} onClick={() => setsie(index, 'istanc', 1)} >
                                                                <div className='px-2'>
                                                                    <img className='w-100' src={imregu} style={{ maxWidth: '6.5em', backgroundColor: `${xitems.istanc === 1 ? 'rgb(0, 153, 255)' : ''}` }} />
                                                                </div>
                                                                <div className='if09em'>{t('レギュラー')}</div>
                                                                <div className='if07em' style={{ marginTop: '-0.5em' }}>（{t('左足前')}）</div>
                                                                <div className='if07em'>
                                                                    <input type='radio' className='iradio' name='istanc' id='' checked={xitems.istanc === 1 ? true : false} readOnly />
                                                                </div>
                                                            </div>
                                                            <div className='text-center border-start' style={{ flex: 1 }} onClick={() => setsie(index, 'istanc', 2)} >
                                                                <div className='px-2'>
                                                                    <img className='w-100' src={imgoof} style={{ maxWidth: '6.5em', backgroundColor: `${xitems.istanc === 2 ? 'rgb(0, 153, 255)' : ''}` }} />
                                                                </div>
                                                                <div className='if09em'>{t('グーフィー')}</div>
                                                                <div className='if07em' style={{ marginTop: '-0.5em' }}>（{t('右足前')}）</div>
                                                                <div className='if07em'>
                                                                    <input type='radio' className='iradio' name='istanc' id='' checked={xitems.istanc === 2 ? true : false} readOnly />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                    )
                                })}
                            </div>

                        </div>

                        <div className="border border-danger mt-3 p-2 mb-5">
                            <div dangerouslySetInnerHTML={{ __html: t('itemselecttip1') }}></div>
                            <div className="text-danger" dangerouslySetInnerHTML={{ __html: t('itemselecttip2') }}></div>
                        </div>
                    </Container>

                </div>
            </CSSTransition>

            <footer className="position-fixed bottom-0 start-0 end-0 bg-white border-top">
                <div className="d-flex justify-content-between px-2 py-1" style={{ height: '3.2em' }}>
                    <Button variant="light" style={{ width: '7em' }} onClick={fprevi}>{t('戻る')}</Button>{' '}
                    <Button variant="primary" style={{ width: '7em' }} onClick={fconti}>{t('次へ')}</Button>{' '}
                </div>
            </footer>
        </>
    )
}

export default Fitems;