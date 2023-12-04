import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, InputGroup, ButtonGroup, ToggleButton } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import { fdelif, xsctry, xsikbt, xmemsi } from './Sgloba';
import imname from "../assets/icons/name.png";
import im_sex from "../assets/icons/ico-sex.png";
import imbirt from "../assets/icons/birthday.png";
import imheig from "../assets/icons/height-32.png";
import imfoot from "../assets/icons/foot-3-32.png";
import imweig from "../assets/icons/weight-7-32.png";
import imnext from "../assets/icons/next-26-32.png";
import imprev from "../assets/icons/back-off-26-32.png";
import implus from "../assets/icons/plus-31-32.png";

// ユーザー情報がどのように入力されたかを確認する - kiểm tra cách thông tin người dùng đã nhập
// return 0 -> OK  || 1 -> 一人目異常 || 2 -> 二人目異常 || 3 -> 三人目異常 || 4 -> 四人目異常
function faudit(xipobj, xipcmd, i18n) {
    let xresul = 0;
    if (xipcmd != 'all') {
        // 各部分を確認 - kiểm tra từng phần
        const xuseri = xipobj[xipcmd].xuseri;
        Object.keys(xuseri).forEach(key => {
            if (i18n.language == 'en' && (key == 'uhfnam' || key == 'uhlnam')) {
                // Englishの場合セイとメイチェック不要
            } else {
                const xvalue = xuseri[key];
                if (xvalue === "") {
                    xresul = xipcmd + 1;
                }
            }
        });
    } else {
        // それらをすべてチェック - kiểm tra tất cả
        let zerock = false;
        Object.keys(xipobj).map((key, idx) => {
            const xuseri = xipobj[key].xuseri;
            // 少なくとも 1 つの入力に値があればチェックします - chỉ kiểm tra nếu có ít nhất 1 input có giá trị
            const hasval = Object.values(xuseri).some(value => value !== "" && value !== false && value !== 0);
            console.log(hasval)
            if (hasval) {
                Object.keys(xuseri).forEach(key => {
                    if (i18n.language == 'en' && (key == 'uhfnam' || key == 'uhlnam')) {
                        // Englishの場合セイとメイチェック不要
                    } else {
                        const xvalue = xuseri[key];
                        if (xvalue === "" && xresul === 0) {
                            xresul = idx + 1;
                        }
                    }
                });
                zerock = true;
            }
        });
        if (!zerock) {
            // 全然ない場合
            xresul = 1;
        }
    }

    return xresul;
}

function Fuserf() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const xordin = [t('一人目'), t('二人目'), t('三人目'), t('四人目')];

    const location = 2;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [xvalid, setvalid] = useState(false);
    const [xidchk, setidchk] = useState(false);

    // 情報が表示される順序 - thứ tự thông tin đang hiển thị
    const [xuindx, setUindx] = useState(0);

    // const xblkhg = useRef(null);
    // const [xdomhg, setdomhg] = useState(0);

    // animation
    const [xanima, setanima] = useState('');

    // 利用者情報 - thông tin người sử dụng
    const [xrtinf, setXrtinf] = useState(JSON.parse(localStorage.getItem("luseri")));

    //
    const [xsipop, setsipop] = useState(false);

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

    // set
    const setval = (e, idx) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        console.log(fieldValue)

        setXrtinf((prevXrtinf) => ({
            ...prevXrtinf,
            [idx]: {
                ...prevXrtinf[idx],
                xuseri: {
                    ...prevXrtinf[idx].xuseri,
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
                xuseri: {
                    ...prevXrtinf[idx].xuseri,
                    [fieldName]: fieldValue
                }
            }
        }));
    }

    // 削除ボタン
    const delinf = (xindex) => {
        if (window.confirm(t('NM0003'))) {
            setXrtinf(fdelif(xrtinf, xindex));
            if (xuindx != 0) {
                setUindx(xuindx - 1);
            } else {
                setUindx(0);
            }
        }
    }

    // 前の人へボタン
    const previf = () => {
        if (xuindx > 0) {
            setUindx(xuindx - 1)
        }
        setanima('fadeprev');
    };

    // 次の人へボタン
    const nextif = () => {
        if (xuindx < 3) {
            setvalid(true);
            setidchk(xuindx);
            if (faudit(xrtinf, xuindx, i18n) === 0) {
                setUindx(xuindx + 1)
            } else {
                dispatch({ type: 'MODAL', payload: [1, t('NM0001')] });
            }

        }
        setanima('fadenext');
    }

    // // ユーザー情報入力ブロックの高さを取得する - lấy chiều cao của block nhập thông tin người dùng
    // useEffect(() => {
    //     if (xblkhg.current) {
    //         const element = ReactDOM.findDOMNode(xblkhg.current);
    //         setdomhg(element.offsetHeight);
    //     }
    // }, []);

    // 代表者の情報を使用する - sử dụng thông tin của người đại diện
    const freuse = (e, idx) => {
        const srepre = JSON.parse(localStorage.getItem("lrepre"));
        if (e.target.checked) {
            setXrtinf((prevXrtinf) => ({
                ...prevXrtinf,
                [idx]: {
                    ...prevXrtinf[idx],
                    xuseri: {
                        ...prevXrtinf[idx].xuseri,
                        ufolow: true,
                        ukfnam: srepre.xfname,
                        uklnam: srepre.xlname,
                        uhfnam: srepre.xfhame,
                        uhlnam: srepre.xlhame,
                        udxsex: srepre.xdxsex
                    }
                }
            }));
        } else {
            setXrtinf((prevXrtinf) => ({
                ...prevXrtinf,
                [idx]: {
                    ...prevXrtinf[idx],
                    xuseri: {
                        ...prevXrtinf[idx].xuseri,
                        ufolow: false,
                        ukfnam: "",
                        uklnam: "",
                        uhfnam: "",
                        uhlnam: "",
                        udxsex: "0"
                    }
                }
            }));
        }
    }

    // 区別判断
    useEffect(() => {
        if (xrtinf[xuindx].xuseri.u_year && xrtinf[xuindx].xuseri.umonth && xrtinf[xuindx].xuseri.u__day) {
            const xbrstr = `${xrtinf[xuindx].xuseri.u_year}-${("0" + xrtinf[xuindx].xuseri.umonth).slice(-2)}-${("0" + xrtinf[xuindx].xuseri.u__day).slice(-2)}`;
            const xtoday = new Date();
            const xkubet = new Date(`${new Date().getFullYear() + 1}-03-31`);
            const xbirth = new Date(xbrstr);
            let x__age = xtoday.getFullYear() - xbirth.getFullYear();
            const m = xtoday.getMonth() - xbirth.getMonth();
            if (m < 0 || (m === 0 && xtoday.getDate() < xbirth.getDate())) {
                x__age--;
            }
            let xkbage = xkubet.getFullYear() - xbirth.getFullYear();
            const k = xkubet.getMonth() - xbirth.getMonth();
            if (k < 0 || (k === 0 && xkubet.getDate() < xbirth.getDate())) {
                xkbage--;
            }
            const clsify = xkbage > 12 ? 1 : 2;
            
            setXrtinf((prevXrtinf) => ({
                ...prevXrtinf,
                [xuindx]: {
                    ...prevXrtinf[xuindx],
                    xuseri: {
                        ...prevXrtinf[xuindx].xuseri,
                        u__age: x__age,
                        clsify: clsify
                    }
                }
            }));
            
        }
    }, [xrtinf[xuindx].xuseri.u_year, xrtinf[xuindx].xuseri.umonth, xrtinf[xuindx].xuseri.u__day])

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
        setvalid(true);
        setidchk(xuindx);
        const xchker = faudit(xrtinf, 'all', i18n);
        if (xchker === 0) {
            localStorage.setItem("luseri", JSON.stringify(xrtinf));
            dispatch({ type: 'NXPRID', payload: +1 });
            navigate('/itemselect');
        } else {
            dispatch({ type: 'MODAL', payload: [1, xordin[xchker - 1] + t('の') + t('NM0002')] });
        }

    }

    useEffect(() => {
        setnxpram(true);
    }, []);
    return (
        <>
            <CSSTransition in={nxpram} timeout={300} classNames={slanim} unmountOnExit >
                <div className='position-fixed start-0 top-0 bottom-0 end-0 pb-5 vh-100 overflow-auto'>
                    <div className="text-center mt-5 pt-2 fs-5 fw-blod bg-light">
                        {t('貸出者情報')}
                    </div>
                    <div className="text-center fs-5 fw-blod bg-warning">
                        {xordin[xuindx]}
                    </div>

                    <div className='d-flex justify-content-between' style={{ overflowX: 'hidden' }}>
                        <div className='position-relative' style={{ width: '11%' }}>
                            <div className='position-absolute top-0 start-0 end-0 bottom-0 bg-light' style={{ zIndex: 1 }} onClick={previf}>
                                <div className={`d-flex flex-column justify-content-center align-items-center h-100 w-100 fs-5 fw-bolder ${xuindx == 0 ? 'd-none' : ''}`}>
                                    <img src={imprev} />
                                    <div dangerouslySetInnerHTML={{ __html: t('前の人へ') }}></div>
                                    <img src={imprev} />
                                </div>
                            </div>
                        </div>
                        <div className='bg-white position-relative' style={{ flex: 1, height: `${i18n.language == 'jp' ? '422px' : '380px'}` }}>

                            {
                                Object.keys(xrtinf).map((key, idx) => {
                                    const xuseri = xrtinf[key].xuseri;
                                    const hasufl = Object.values(xrtinf).some(item => item.xuseri.ufolow == true);
                                    return (
                                        <CSSTransition key={key} in={xuindx === idx}
                                            timeout={300} classNames={xanima} unmountOnExit >

                                            <div className={`position-absolute p-1`} >{/* ref={idx === 0 ? xblkhg : null} */}

                                                <div className='d-flex justify-content-between'>
                                                    <div><Form.Check type='checkbox' id={`default-`} label={t('代表者情報からを使用します')} name='ufolow'
                                                        checked={xuseri.ufolow == true ? true : false}
                                                        className={hasufl && xuseri.ufolow != true ? 'd-none' : ''} onChange={(e) => freuse(e, idx)} /></div>
                                                    <div><Button className='py-0' variant="danger" onClick={() => delinf(xuindx)}>{t('削除')}</Button>{' '}</div>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <img src={imname} />
                                                    <div className="px-2">{t('貸出者氏名')}</div>
                                                </div>
                                                <Row className="pt-2">
                                                    <Col xs={6}>
                                                        <Form.Control type="text" placeholder={t('姓')} name='ukfnam' onChange={(e) => setval(e, idx)} value={xuseri.ukfnam}
                                                            className={xvalid && xidchk == idx ? xuseri.ukfnam ? 'is-valid' : 'is-invalid' : null} />
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Form.Control type="text" placeholder={t('名')} name='uklnam' onChange={(e) => setval(e, idx)} value={xuseri.uklnam}
                                                            className={xvalid && xidchk == idx ? xuseri.uklnam ? 'is-valid' : 'is-invalid' : null} />
                                                    </Col>
                                                </Row>
                                                {i18n.language == 'jp' ?
                                                    <Row className="pt-2">
                                                        <Col xs={6}>
                                                            <Form.Control type="text" placeholder={t('セイ')} name='uhfnam' onChange={(e) => setval(e, idx)} value={xuseri.uhfnam}
                                                                className={xvalid && xidchk == idx ? xuseri.uhfnam ? 'is-valid' : 'is-invalid' : null} />
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Control type="text" placeholder={t('メイ')} name='uhlnam' onChange={(e) => setval(e, idx)} value={xuseri.uhlnam}
                                                                className={xvalid && xidchk == idx ? xuseri.uhlnam ? 'is-valid' : 'is-invalid' : null} />
                                                        </Col>
                                                    </Row> : null
                                                }

                                                <Row className="pt-2 align-items-center">
                                                    <Col xs={4} className='pe-0'>
                                                        <div className="d-flex align-items-center">
                                                            <img src={im_sex} />
                                                            <div className="px-2">{t('性別')}:</div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={8} className='d-flex justify-content-end ps-0'>
                                                        <ButtonGroup style={{ float: 'right' }}>
                                                            <ToggleButton id={`radio-0`} className='px-0 border' type="radio" variant={"outline-secondary"} style={{ width: "3.8em" }}
                                                                value='0' checked={xuseri.udxsex == 0} name={`udxsex${idx}`} onChange={() => setsie(idx, 'udxsex', 0)}>{t('未選択')}
                                                            </ToggleButton>
                                                            <ToggleButton id={`radio-1`} className='px-0 border' type="radio" variant={"outline-secondary"} style={{ width: "3.8em" }}
                                                                value='1' checked={xuseri.udxsex == 1} name={`udxsex${idx}`} onChange={() => setsie(idx, 'udxsex', 1)}>{t('男性')}
                                                            </ToggleButton>
                                                            <ToggleButton id={`radio-2`} className='px-0 border' type="radio" variant={"outline-secondary"} style={{ width: "3.8em" }}
                                                                value='2' checked={xuseri.udxsex == 2} name={`udxsex${idx}`} onChange={() => setsie(idx, 'udxsex', 2)}>{t('女性')}
                                                            </ToggleButton>
                                                        </ButtonGroup>
                                                    </Col>
                                                </Row>

                                                <div className="d-flex align-items-center pt-2">
                                                    <img src={imbirt} />
                                                    <div className="px-2">{t('生年月日')}</div>
                                                </div>
                                                <Row className="align-items-center">
                                                    {/* <Col xs={4} className="d-flex align-items-center pe-0">
                                                        <img src={im_age} />
                                                        <div className="px-2">{t('年齢')}:</div>
                                                    </Col> */}
                                                    <Col xs={12} className='d-flex justify-content-end'>
                                                        <div className={`d-flex border rounded px-1 ${xvalid && xidchk == idx ? xuseri.u__age ? 'border-success' : 'border-danger' : null}`}>
                                                            <Form.Select className='border-0 ps-0 uagepe text-end' style={{ width: '5.5em' }}
                                                                name='u_year' onChange={(e) => setval(e, idx)} value={xuseri.u_year} >
                                                                <option value="">{t('年')}</option>
                                                                {Array.from({ length: 100 }, (_, index) => (
                                                                    <option key={index} value={2022 - index}>
                                                                        {2022 - index} {t('Y')}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                            <Form.Select className='border-0 ps-0 uagepe text-end' style={{ width: '4.28em', margin: '0 -0.2em' }}
                                                                name='umonth' onChange={(e) => setval(e, idx)} value={xuseri.umonth} >
                                                                <option value="">{t('月')}</option>
                                                                {Array.from({ length: 12 }, (_, index) => (
                                                                    <option key={index} value={index + 1}>
                                                                        {index + 1}  {t('M')}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                            <Form.Select className='border-0 ps-0 uagepe text-end' style={{ width: '4.28em' }}
                                                                name='u__day' onChange={(e) => setval(e, idx)} value={xuseri.u__day} >
                                                                <option value="">{t('日')}</option>
                                                                {Array.from({ length: 31 }, (_, index) => (
                                                                    <option key={index} value={index + 1}>
                                                                        {index + 1}  {t('D')}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </div>
                                                    </Col>
                                                    {/* <Col xs={4}>
                                                        <InputGroup className="">
                                                            <Form.Select className={`border-end-0 ${xvalid && xidchk == idx ? xuseri.u__age ? 'is-valid' : 'is-invalid' : null}`}
                                                                name='u__age' onChange={(e) => setval(e, idx)} value={xuseri.u__age} >
                                                                <option>{t('未選択')}</option>
                                                                {Array.from({ length: 99 }, (_, index) => (
                                                                    <option key={index} value={index + 1}>
                                                                        {index + 1}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                            <InputGroup.Text className={`bg-white ps-0 ${xvalid && xidchk == idx ? xuseri.u__age ? 'border-success' : 'border-danger' : null}`} id="basic-addon2">{t('歳')}</InputGroup.Text>
                                                        </InputGroup>

                                                    </Col> */}
                                                </Row>

                                                <Row className="pt-2 align-items-center">
                                                    <Col xs={6} className="d-flex align-items-center">
                                                        <img src={imheig} />
                                                        <div className="px-2">{t('身長')}:</div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <InputGroup className="">
                                                            <Form.Control className={`border-end-0 ${xvalid && xidchk == idx ? xuseri.uheigh ? 'is-valid' : 'is-invalid' : null}`} placeholder={t('例') + '： 170'} aria-describedby="basic-addon2"
                                                                type="number" name='uheigh' onChange={(e) => setval(e, idx)} value={xuseri.uheigh} />
                                                            <InputGroup.Text className={`bg-white ps-0 ${xvalid && xidchk == idx ? xuseri.uheigh ? 'border-success' : 'border-danger' : null}`} id="basic-addon2">cm</InputGroup.Text>
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-2 align-items-center">
                                                    <Col xs={6} className="d-flex align-items-center">
                                                        <img src={imfoot} />
                                                        <div className="ps-2 pe-0">{t('靴のサイズ')}:</div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        {i18n.language == 'jp' ?
                                                            <InputGroup className="">
                                                                <Form.Select className={`border-end-0 ${xvalid && xidchk == idx ? xuseri.ufsize ? 'is-valid' : 'is-invalid' : null}`} aria-label="Default select example"
                                                                    name='ufsize' onChange={(e) => setval(e, idx)} value={xuseri.ufsize} >
                                                                    <option value="">{t('未選択')}</option>
                                                                    {Array.from({ length: 31 }, (_, index) => (
                                                                        <option key={index} value={20 + index * 0.5}>
                                                                            {`${20 + index * 0.5}`}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                                <InputGroup.Text className={`bg-white ps-0 ${xvalid && xidchk == idx ? xuseri.ufsize ? 'border-success' : 'border-danger' : null}`} id="basic-addon2">cm</InputGroup.Text>
                                                            </InputGroup>
                                                            :
                                                            <div className={`border rounded d-flex ${xvalid && xidchk == idx ? xuseri.ufsize ? 'border-success' : 'border-danger' : null}`}
                                                            style={{ padding: '0.375rem 0.75rem' }} onClick={() => setsipop(true)}>
                                                                <div className='' style={{ flex: 1 }}>
                                                                    {!xrtinf[xuindx].xuseri.usikbt || !xrtinf[xuindx].xuseri.usctry ? 'select' :
                                                                        xmemsi[xrtinf[xuindx].xuseri.usikbt - 1][xrtinf[xuindx].xuseri.usctry - 1].map((xmdkbr, idx) => {
                                                                            return xrtinf[xuindx].xuseri.ufsize == xmemsi[xrtinf[xuindx].xuseri.usikbt - 1][0][idx] ? xmdkbr : '';
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className=''>
                                                                    {xsctry[xrtinf[xuindx].xuseri.usctry]}/{xsikbt[xrtinf[xuindx].xuseri.usikbt]}
                                                                </div>
                                                            </div>
                                                        }

                                                    </Col>
                                                </Row>

                                                <Row className="pt-2 align-items-center">
                                                    <Col xs={6} className="d-flex align-items-center">
                                                        <img src={imweig} />
                                                        <div className="px-2">{t('体重')}:</div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <InputGroup className="">
                                                            <Form.Control className={`border-end-0 ${xvalid && xidchk == idx ? xuseri.uweigh ? 'is-valid' : 'is-invalid' : null}`} placeholder={t('例') + '： 65'} aria-describedby="basic-addon2"
                                                                type="number" name='uweigh' onChange={(e) => setval(e, idx)} value={xuseri.uweigh} />
                                                            <InputGroup.Text className={`bg-white ps-0 ${xvalid && xidchk == idx ? xuseri.uweigh ? 'border-success' : 'border-danger' : null}`} id="basic-addon2">kg</InputGroup.Text>
                                                        </InputGroup>
                                                    </Col>
                                                </Row>

                                            </div>

                                        </CSSTransition>
                                    );
                                })

                            }
                        </div>
                        <div className='position-relative' style={{ width: '11%' }}>
                            <div className='position-absolute top-0 start-0 end-0 bottom-0 bg-primary' style={{ zIndex: 1 }} onClick={nextif}>
                                <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100 fs-5 fw-bolder text-white'>
                                    {xuindx < 3 ?
                                        (
                                            Object.values(xrtinf[xuindx + 1].xuseri).some(value => value !== "" && value !== false && value !== 0) ? (
                                                <>
                                                    <img src={imnext} />
                                                    <div dangerouslySetInnerHTML={{ __html: t('次の人へ') }}></div>
                                                    <img src={imnext} />
                                                </>
                                            ) : (
                                                <>
                                                    <img src={implus} />
                                                    <div dangerouslySetInnerHTML={{ __html: t('人を追加') }}></div>
                                                    <img src={implus} />
                                                </>
                                            )
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className='px-2 pb-5'>
                        <div className="border border-danger mt-3 p-2 mb-5">
                            <div dangerouslySetInnerHTML={{ __html: t('userinfotip1') }}></div>
                            <div className="text-danger" dangerouslySetInnerHTML={{ __html: t('userinfotip2') }}></div>
                        </div>
                    </div>

                </div>
            </CSSTransition>

            {/* shoe size select */}
            <CSSTransition in={xsipop} timeout={300} classNames='zin' unmountOnExit >
                <div className={`position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center`}
                    style={{ zIndex: 1, backgroundColor: '#00000099' }} onClick={() => setsipop(false)}>
                    <div className='rounded p-1' style={{ width: '13.5em', backgroundColor: '#d0cccc' }} onClick={(e) => e.stopPropagation()}>
                        <div className=''>
                            <div className='d-flex text-center'>
                                <div className='invisible pe-1'>WOMEN'S</div>
                                <div className={`py-1 ${xrtinf[xuindx].xuseri.usctry == 1 ? 'bg-white' : ''}`} style={{ flex: 1 }}
                                    onClick={() => setsie(xuindx, 'usctry', 1)}>JP</div>
                                <div className={`py-1 ${xrtinf[xuindx].xuseri.usctry == 2 ? 'bg-white' : ''}`} style={{ flex: 1 }}
                                    onClick={() => setsie(xuindx, 'usctry', 2)}>US</div>
                                <div className={`py-1 ${xrtinf[xuindx].xuseri.usctry == 3 ? 'bg-white' : ''}`} style={{ flex: 1 }}
                                    onClick={() => setsie(xuindx, 'usctry', 3)}>EU</div>
                            </div>
                            <div className='d-flex'>
                                <div className=''>
                                    <div className={`py-1 pe-1 ${xrtinf[xuindx].xuseri.usikbt == 1 ? 'bg-white' : ''}`}
                                        onClick={() => setsie(xuindx, 'usikbt', 1)}>MEN'S</div>
                                    <div className={`py-1 pe-1 ${xrtinf[xuindx].xuseri.usikbt == 2 ? 'bg-white' : ''}`}
                                        onClick={() => setsie(xuindx, 'usikbt', 2)}>WOMEN'S</div>
                                    <div className={`py-1 pe-1 ${xrtinf[xuindx].xuseri.usikbt == 3 ? 'bg-white' : ''}`}
                                        onClick={() => setsie(xuindx, 'usikbt', 3)}>JUNIOR</div>
                                    <div className={`py-1 pe-1 ${xrtinf[xuindx].xuseri.usikbt == 4 ? 'bg-white' : ''}`}
                                        onClick={() => setsie(xuindx, 'usikbt', 4)}>YOUTH</div>
                                </div>
                                <div className='bg-white w-100 p-1 overflow-auto' style={{ height: '15em' }}>
                                    {xrtinf[xuindx].xuseri.usikbt && xrtinf[xuindx].xuseri.usctry ?
                                        xmemsi[xrtinf[xuindx].xuseri.usikbt - 1][xrtinf[xuindx].xuseri.usctry - 1].map((xmdkbr, idx) => {
                                            return <div className={`p-1 ${xrtinf[xuindx].xuseri.ufsize == xmemsi[xrtinf[xuindx].xuseri.usikbt - 1][0][idx] ? 'bg-info' : ''}`} key={idx}
                                                onClick={() => { setsie(xuindx, 'ufsize', xmemsi[xrtinf[xuindx].xuseri.usikbt - 1][0][idx]); setsipop(false) }}>{xmdkbr}</div>
                                        }) : 
                                        'Please select the size category and size type.'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
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

export default Fuserf;