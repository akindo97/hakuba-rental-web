import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import { format } from 'date-fns';
import { fpreso, xOpric, xKpric, xiname, xsctry, xsikbt, xmemsi, setpre, fcvmny } from './Sgloba';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import iconv from 'iconv-lite';
import imwarn from '../assets/icons/warning.png';
import imheig from "../assets/icons/height-32.png";
import imfoot from "../assets/icons/foot-3-32.png";
import imweig from "../assets/icons/weight-7-32.png";

const xupdat = format(new Date(), 'yyyyMMddhhmmss');
const lupdat = '%' + xupdat;

function Fqrshw() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const location = 4;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lterms = localStorage.getItem('lterms') ? localStorage.getItem('lterms').split(',') : [0, ""];

    const [xterms, setterms] = useState(false);
    const [xcterm, setcterm] = useState(lterms[0]);

    // スキーヤー　レベル
    const ilevel = ["　", t('初級'), t('中級'), t('上級')];
    const istanc = ["　", t('レギュラー'), t('グーフィー')];

    var release = [
        ["", "", 15, 18, 20, 22, 25, 27, 29, 31],
        ["", 10, "0.75", "0.75", "0.75", "", "", "", "", ""],
        ["", 14, "1.0", "0.75", "0.75", "0.75", "", "", "", ""],
        ["", 18, "1.5", "1.25", "1.25", "1.0", "", "", "", ""],
        ["", 22, "2.0", "1.75", "1.5", "1.5", "1.25", "", "", ""],
        ["", 26, "2.5", "2.25", "2.0", "1.75", "1.5", "1.5", "", ""],
        ["", 31, "3.0", "2.75", "2.5", "2.25", "2.0", "1.75", "1.75", ""],
        [0, 36, "", "3.5", "3.0", "2.75", "2.5", "2.25", "2.0", ""],
        [148, 42, "", "", "3.5", "3.0", "3.0", "2.75", "2.5", ""],
        [149, 49, "", "", "4.5", "4.0", "3.5", "3.5", "3.0", ""],
        [158, 58, "", "", "5.5", "5.0", "4.5", "4.0", "3.5", "3.0"],
        [167, 67, "", "", "6.5", "6.0", "5.5", "5.0", "4.5", "4.0"],
        [179, 79, "", "", "7.5", "7.0", "6.5", "6.0", "5.5", "5.0"],
        [195, 95, "", "", "", "8.5", "8.0", "7.0", "6.5", "6.0"],
        [999, 999, "", "", "", "10.0", "9.5", "8.5", "8.0", "7.5"],
        ["", "", "", "", "", "11.5", "11.0", "10.0", "9.5", "9.0"],
        ["", "", "", "", "", "", "12.0", "11.0", "10.5", "10.5"]
    ]


    // 代表的な情報 - thông tin người đại diện
    const srepre = JSON.parse(localStorage.getItem("lrepre"));

    // 利用者情報 - thông tin người sử dụng
    const xrtinf = JSON.parse(localStorage.getItem("luseri"));

    // 人数調査 - tìm số người
    // 人数 - số người
    const xcount = fpreso(xrtinf);

    // 解放値
    const [xreles, setreles] = useState(["", "", "", ""]);

    // 白鳥ID
    const xskiid = "$8105015231211120";

    const xtotal = Object.values(xrtinf).reduce((acc, item) => acc + item.xitems.isubtl, 0);

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

    const fterms = () => {
        localStorage.setItem('lterms', [1, lupdat]);
        setcterm(1);
    }

    // 解放値
    useEffect(() => {
        let xkaiho = ["", "", "", ""];
        for (let i = 0; i < xcount; i++) {
            const xuseri = xrtinf[i].xuseri;
            const xitems = xrtinf[i].xitems;
            if (xitems.isitem[0] != 0) {
                xkaiho[i] = CL_release(xuseri.ufsize, xuseri.uheigh, xuseri.uweigh, xuseri.u__age, xitems.ilevel, release);
            }
        }
        setreles(xkaiho);
    }, [])

    // QRcode 作成
    useEffect(() => {
        // let xcreqr = [[], [], []];

        // xcreqr[0] = [
        //     srepre.xfname,
        //     srepre.xlname,
        //     srepre.xfhame,
        //     srepre.xlhame,
        //     srepre.xdxsex,
        //     srepre.xzcode,
        //     srepre.xadre1,
        //     srepre.xadre2,
        //     srepre.xadre3,
        //     srepre.xadre4,
        //     srepre.xphone
        // ]

        // Object.keys(xrtinf).map((key) => {
        //     const xuseri = xrtinf[key].xuseri;
        //     const xitems = xrtinf[key].xitems;
        //     xcreqr[1][key] = [
        //         xuseri.ukfnam != "" ? xuseri.ukfnam : 0,
        //         xuseri.uklnam != "" ? xuseri.uklnam : 0,
        //         xuseri.uhfnam != "" ? xuseri.uhfnam : 0,
        //         xuseri.uhlnam != "" ? xuseri.uhlnam : 0,
        //         xuseri.u__age != "" ? xuseri.u__age : 0,
        //         xuseri.uheigh != "" ? xuseri.uheigh : 0,
        //         xuseri.ufsize != "" ? xuseri.ufsize : 0,
        //         xuseri.uweigh != "" ? xuseri.uweigh : 0,
        //         xuseri.clsify != "" ? xuseri.clsify : 0,
        //         xitems.istart != "" ? xitems.istart : 0,
        //         xitems.i__end != "" ? xitems.i__end : 0,
        //         xitems.i__day != "" ? xitems.i__day : 0,
        //         xitems.isitem != "" ? xitems.isitem : 0,
        //         xitems.isubtl != "" ? xitems.isubtl : 0,
        //         xitems.ilevel != "" ? xitems.ilevel : 0,
        //         xitems.istanc != "" ? xitems.istanc : 0
        //     ]
        // });

        // xcreqr[2] = [xcount, xtotal]
        // console.log(JSON.stringify(xcreqr));
        // const xfmshw = new QRCode(Fqrsfm(JSON.stringify(xcreqr)));
        // setTimeout(() => {
        //     document.getElementById("ishwqr").appendChild(xfmshw);
        // }, 100);

        let xcrsqr = "";
        xcrsqr += srepre.xfname + '\n' +
            srepre.xlname + '\n' +
            srepre.xfhame + '\n' +
            srepre.xlhame + '\n' +
            srepre.xdxsex + '\n' +
            srepre.xzcode + '\n' +
            srepre.xadre1 + '\n' +
            srepre.xadre2 + '\n' +
            srepre.xadre3 + '\n' +
            srepre.xadre4 + '\n' +
            srepre.xphone + '\n'
        Object.keys(xrtinf).map((key, idx) => {
            const xuseri = xrtinf[key].xuseri;
            const xitems = xrtinf[key].xitems;
            xcrsqr +=
                xuseri.ukfnam + '\n' +
                xuseri.uklnam + '\n' +
                xuseri.uhfnam + '\n' +
                xuseri.uhlnam + '\n' +
                xuseri.udxsex + '\n' +
                // xuseri.u_year + ("0" + xuseri.umonth).slice(-2) + ("0" + xuseri.u__day).slice(-2) + '\n' +
                xuseri.u__age + '\n' +
                xuseri.uheigh + '\n' +
                xuseri.ufsize + '\n' +
                xuseri.uweigh + '\n' +
                xuseri.clsify + '\n' +
                xitems.i__day + '\n' +
                xitems.isubtl + '\n' +
                xitems.istart + '\n' +
                xitems.i__end + '\n' +
                xitems.isitem + '\n' +
                xitems.ilevel + '\n' +
                xitems.istanc + '\n' +
                xreles[idx] + '\n';
        });

        xcrsqr +=
            xcount + '\n' +
            xtotal + '\n' +
            (lterms[1] != "" ? lterms[1] : lupdat) + '\n' +
            xskiid + '\n';

        console.log(xcrsqr);
        console.log(xcrsqr.split("\n"));

        import("./qrcode/QRCodet").then(({ QRCode }) => {
            const xfsshw = new QRCode(Fqrsfm(xcrsqr));
            setTimeout(() => {
                document.getElementById("ishsqr").appendChild(xfsshw);
            }, 100);
        });


    }, [])



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
        setlanim('zin');
        setnxpram(false);
        setTimeout(() => {
            navigate('/');
        }, 200);
    }

    useEffect(() => {
        setnxpram(true);
    }, []);
    return (
        <>
            <CSSTransition in={nxpram} timeout={300} classNames={slanim} unmountOnExit >
                <div className='position-fixed start-0 top-0 bottom-0 end-0 pb-5 vh-100 overflow-auto'>
                    <div className={xcterm == 0 ? '' : 'd-none'}>
                        <div className="text-center mt-5 pt-2 fs-5 fw-blod bg-light text-danger">
                            {t('レンタル利用規約')}
                        </div>
                        <div className='text-center'>
                            <img src={imwarn} />
                            <div className='mb-2'>{t('必ずお読みください')}</div>
                        </div>
                        <Container className='pb-5'>
                            <div className='border p-2' dangerouslySetInnerHTML={{ __html: t('terms') }}>
                            </div>

                            <div className='border d-flex align-items-center mt-3 p-2'>
                                <div className='p-2 pe-3'>
                                    <input className='iradio' id='cterms' type='checkbox' onChange={() => setterms(!xterms)} checked={xterms} />
                                </div>
                                <label htmlFor='cterms'>{t('termschk')}</label>
                            </div>

                            <footer className="position-fixed bottom-0 start-0 end-0 bg-white border-top">
                                <div className="d-flex justify-content-between px-2 py-1" style={{ height: '3.2em' }}>
                                    <Button variant="light" style={{ width: '7em' }} onClick={() => window.history.back()}>{t('戻る')}</Button>{' '}
                                    <Button variant="primary" style={{ width: '7em' }} disabled={!xterms} onClick={fterms}>{t('次へ')}</Button>{' '}
                                </div>
                            </footer>
                        </Container>
                        <div className='pb-5'></div>
                    </div>
                    <div className={xcterm == 0 ? 'd-none' : ''}>
                        <div className="text-center mt-5 pt-2 fs-5 fw-blod bg-light">
                            {t('受付用QRコード')}
                        </div>

                        <Container className='pb-5'>
                            <div className='text-center'>
                                <div id='ishwqr'></div>
                                <div id='ishsqr'></div>
                            </div>

                            <hr className='mt-0' />

                            <div className='border border-dark d-flex'>
                                <div className='text-center border-end border-dark' style={{ minWidth: '8.6em' }}>
                                    <div className='px-1 d-flex'>
                                        <div>{t('開')}：</div>
                                        <div className='w-100'>{xrtinf[0].xitems.istart.replace(/-/g, "/")}</div>
                                    </div>
                                    <div style={{ margin: '-0.12em 0 -0.12em 0' }}>～</div>
                                    <div className='px-1 d-flex'>
                                        <div>{t('返')}：</div>
                                        <div className='w-100'>{xrtinf[0].xitems.i__end.replace(/-/g, "/")}</div>
                                    </div>
                                    <div className='d-flex px-1 border-top'>
                                        <div className=''>{t('数')}：</div>
                                        <div className='flex-grow-1'>{xcount}人</div>
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <div className='text-center border-bottom'>{t('代表者')}</div>
                                    <div className='if08em text-center'>　　{srepre.xfhame}{srepre.xlhame}</div>
                                    <div className='d-flex px-1'>
                                        <div className=''>{t('名前')}：</div>
                                        <div className='flex-grow-1 text-center'>{srepre.xfname}{srepre.xlname}</div>
                                        <div className=''>{t('様')}</div>
                                    </div>
                                    <div className='px-1 border-top' style={{ backgroundColor: '#EE7C6B' }}>
                                        <div className='d-flex'>
                                            <div className=''>{t('合計')}：</div>
                                            <div className='flex-grow-1 text-end'>¥{fcvmny(xtotal)}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {Array.from({ length: xcount }, (_, index) => {
                                const xuseri = xrtinf[index].xuseri;
                                const xitems = xrtinf[index].xitems;
                                const isitem = xitems.isitem.split('');
                                const xprice = xuseri.clsify == 1 ? xOpric : xKpric; // 大人 ?? 子供 ??

                                let itract = 0;
                                // セットチェック
                                for (const key in setpre) {
                                    if (setpre.hasOwnProperty(key)) {
                                        const xvlset = setpre[key];
                                        let isetis = xvlset.isitem; // 000000000000
                                        let setchk = true; // セットある？
                                        isetis = isetis.split('');
                                        isetis.forEach((xvchar, xvlidx) => {
                                            if (xvchar != 0) {
                                                if (isitem[xvlidx] != isetis[xvlidx]) {
                                                    setchk = false;
                                                }
                                            }
                                        });

                                        if (setchk && !itract) {
                                            // セット場合
                                            isetis.forEach((xvchar, xvlidx) => {
                                                if (xvchar != 0) {
                                                    isitem[xvlidx] = xvlset.inewse[xvlidx];
                                                }
                                            });
                                        }
                                    }
                                }

                                return (
                                    <div key={index} className='border border-dark d-flex mt-2'>
                                        <div className='border-end border-dark' style={{ minWidth: '4.67875em' }}>
                                            <div className='border-bottom px-1'>{xuseri.u__age}<span className='if07em'>才</span>
                                                -{xuseri.clsify == 1 ? t('大人') : t('子供')}
                                            </div>
                                            <div className='border-bottom px-1'>{ilevel[xitems.ilevel]}</div>
                                            {xitems.istanc == 0 ?
                                                <div className='px-1'>{t('日貸数')}：</div> :
                                                <div className='border-bottom if08em px-1'>{istanc[xitems.istanc]}</div>
                                            }
                                            <div className='border-bottom text-end px-1'>{xitems.i__day}{t('日')}</div>
                                            <div className='px-1'>{t('解放値')}：</div>
                                            <div className='text-end px-1'>
                                                {/* {isitem[0] != 0 ?
                                                    CL_release(xuseri.ufsize, xuseri.uheigh, xuseri.uweigh, xuseri.u__age, xitems.ilevel, release) :
                                                    "　"
                                                } */}
                                                {xreles[index]}
                                            </div>
                                        </div>
                                        <div className='border-end border-dark' style={{ minWidth: '3.8125em' }}>
                                            <div className='border-bottom'>
                                                <div className='d-flex px-1'>
                                                    <img className='qsicon' src={imheig} />
                                                    <div className='if07em w-100'>
                                                        <div className=''>{t('身長')}</div>
                                                        <div className='text-end qc-6px'>cm</div>
                                                    </div>
                                                </div>
                                                <div className='q-02em px-1'>{xuseri.uheigh}</div>
                                            </div>
                                            <div className='border-bottom'>
                                                <div className='d-flex px-1'>
                                                    <img className='qsicon' src={imfoot} />
                                                    <div className='if07em w-100'>
                                                        <div className=''>{t('足')}</div>
                                                        <div className='text-end qc-6px'>
                                                            {i18n.language == 'jp' ?
                                                                'cm'
                                                                :
                                                                (!xuseri.usikbt || !xuseri.usctry) ? 'cm' :
                                                                `${xsctry[xuseri.usctry]}/${xsikbt[xuseri.usikbt]}`
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='q-02em px-1'>
                                                    {i18n.language == 'jp' ?
                                                        xuseri.ufsize
                                                        :
                                                        (!xuseri.usikbt || !xuseri.usctry) ? xuseri.ufsize :
                                                        xmemsi[xuseri.usikbt - 1][0].indexOf(xuseri.ufsize) != -1 ?
                                                        xmemsi[xuseri.usikbt - 1][xuseri.usctry - 1][xmemsi[xuseri.usikbt - 1][0].indexOf(xuseri.ufsize)] : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className='border-bottom'>
                                                <div className='d-flex px-1'>
                                                    <img className='qsicon' src={imweig} />
                                                    <div className='if07em w-100'>
                                                        <div className=''>{t('体重')}</div>
                                                        <div className='text-end qc-6px'>kg</div>
                                                    </div>
                                                </div>
                                                <div className='q-02em px-1'>{xuseri.uweigh}</div>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-between  flex-grow-1'>
                                            <div className=''>
                                                <div className='if08em text-center'>{xuseri.uhfnam}{xuseri.uhlnam}</div>
                                                <div className='border-bottom text-center'>{xuseri.ukfnam}{xuseri.uklnam}</div>
                                                <div className='px-1'>
                                                    {isitem.map((item, index) => {
                                                        if (item == 1) {
                                                            return (
                                                                <div className='d-flex justify-content-between' key={index}>
                                                                    <div className=''>{xiname[index]}</div>
                                                                    {/* 普通 */}
                                                                    <div className=''>¥{fcvmny(xprice[xitems.i__day][index])}</div>
                                                                </div>
                                                            );
                                                        }
                                                        if (item > 1) {
                                                            const xsetpr = xuseri.clsify == 1 ? setpre[item].iOpris : setpre[item].iKpris;
                                                            return (
                                                                <div className='d-flex justify-content-between' key={index}>
                                                                    <div className=''>{setpre[item].isname}</div>
                                                                    {/* セット */}
                                                                    <div className=''>¥{fcvmny(xsetpr[xitems.i__day])}</div>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}

                                                </div>
                                            </div>
                                            <div className='px-1 border-top' style={{ backgroundColor: '#FFFF99' }}>
                                                <div className='d-flex justify-content-between'>
                                                    <div className=''>{t('利用金額')}：</div>
                                                    <div className=''>¥{fcvmny(xitems.isubtl)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="border border-danger mt-3 p-2 mb-5">
                                <div dangerouslySetInnerHTML={{ __html: t('qrshowtip1') }}></div>
                            </div>
                        </Container>
                    </div>

                </div>
            </CSSTransition>

            <footer className={`position-fixed bottom-0 start-0 end-0 bg-white border-top ${xcterm == 0 ? 'd-none' : ''}`} >
                <div className="d-flex justify-content-between px-2 py-1" style={{ height: '3.2em' }}>
                    <Button variant="light" style={{ width: '7em' }} onClick={fprevi}>{t('戻る')}</Button>{' '}
                    <Button variant="primary" style={{ width: '7em' }} onClick={fconti} >{t('ホーム')}</Button>{' '}
                </div>
            </footer>

        </>
    )
}

function Fqrsfm(X) {
    var FSJISCV = SJISCV(X);
    // console.log(FSJISCV.join(''));
    var SUMCRC = CRCSUM(FSJISCV);
    // console.log(SUMCRC);
    var Hanten = hanten(SUMCRC);
    // console.log("HAnten: " + Hanten);
    var result = new Array();
    for (var i = 0; i < FSJISCV.length; i++) {
        if (i % 2 == 0) {
            result[i] = parseInt(FSJISCV[i], 16) ^ Hanten[0];
        } else {
            result[i] = parseInt(FSJISCV[i], 16) ^ Hanten[1];
        }
    }
    // let ts1 = result;
    // let ts2 = [];
    // for(var i=0; i<ts1.length; i++) {
    //     ts2[i] = ("0" + (ts1[i].toString(16))).slice(-2);
    // }
    // console.log(ts1)
    if ((SUMCRC).toString(16).length == 3) {
        result.push(parseInt((SUMCRC).toString(16).substring(0, 1), 16), parseInt((SUMCRC).toString(16).substring(1), 16), 10)
    } else {
        result.push(parseInt((SUMCRC).toString(16).substring(0, 2), 16), parseInt((SUMCRC).toString(16).substring(2), 16), 10)
    }

    const SQR = new Uint8Array(result);
    return SQR;
}

function SJISCV(s) {
    const x_sjis = iconv.encode(s, 'sjis');
    var s3 = new Array();
    for (var i = 0; i < x_sjis.length; i++) {
        s3[i] = (('0' + x_sjis[i].toString(16)).slice(-2));
    }
    return s3;
}

function CRCSUM(s) {
    var s2 = new Array();
    for (var i = 0; i < s.length; i++) {
        s2[i] = parseInt(s[i], 16);
    }
    var crc = 0;
    for (var x = 0; x < s2.length; x++) {

        crc = crc ^ s2[x];
        for (var y = 0; y < 8; y++) {

            if ((crc & 0x0001) == 0x0001) crc = ((crc >> 1) ^ 0x8408);
            else crc = crc >> 1;
        }
    }
    return crc;
}

function hanten(number) {
    var hanten = number ^ 0xffff;
    var crcar = new Array(0, 0);
    crcar[0] = parseInt((hanten).toString(16).substring(2, 4), 16);
    crcar[1] = parseInt((hanten).toString(16).substring(0, 2), 16);
    return crcar;
}

function CL_release(S, H, G, Age, LV, release) {
    var Xsize = 0;
    var Xheight = 0;
    var Xweight = 0;
    var XX = 0;
    var XY = 0;
    // stt size giày
    for (var i = 0; i < release[0].length - 1; i++) {
        if (S > 30) {
            Xsize = 9;
            break;
        }
        if (release[0][i] <= S && release[0][i + 1] > S) {
            if (i < 2) {
                Xsize = 3;
                break;
            }
            Xsize = i;
            break;
        }
    }
    XY = Xsize;
    // stt chiều cao
    for (var i = 0; i < release.length - 1; i++) {
        if (release[i][0] <= H && release[i + 1][0] > H) {
            if (i < 8) {
                Xheight = 8;
                break;
            }
            Xheight = i;
            break;
        }
    }
    // stt cân nặng
    for (var i = 0; i < release.length - 1; i++) {
        if (release[i][1] <= G && release[i + 1][1] > G) {
            if (i < 1) {
                Xweight = 0;
                break;
            }
            Xweight = i;
            break;
        }
    }

    if (Xheight == Xweight) {
        XX = Xheight;
    } else if (Xheight > Xweight) {
        XX = Xweight;
    } else if (Xheight < Xweight) {
        XX = Xheight;
    }

    if (Age >= 50 || Age <= 9) {
        XX -= 1;
    }

    if (LV == 2) {
        XX += 1;
    }
    if (LV == 3) {
        if (G <= 22) {
            XX += 1;
        } else {
            XX += 2;
        }
    }

    var RS = release[XX][XY];

    return RS;

}

export default Fqrshw;

