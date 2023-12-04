import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, ButtonGroup, Button, ToggleButton, Container } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import imname from "../assets/icons/name.png";
import im_sex from "../assets/icons/ico-sex.png";
import imaddr from "../assets/icons/address.png";
import imphoe from "../assets/icons/phone.png";

function Frepre() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const [xvalid, setvalid] = useState(false);

    const location = 1;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 代表的な情報 - thông tin người đại diện
    const [srepre, setrepre] = useState(JSON.parse(localStorage.getItem("lrepre")));

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

    const setval = (e) => {
        const update = { ...srepre, [e.target.name]: e.target.value };
        setrepre(update);
        console.log(e.target.name);
    };

    const fxcode = (e) => {
        setval(e);
        if (e.target.value.length >= 6 && e.target.value.length <= 8) {
            fetch(`https://zipcoda.net/api?zipcode=${e.target.value}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    const pref = data.items[0].components[0];
                    const city = data.items[0].components[1];
                    const addr = data.items[0].components[2];
                    console.log(pref, city, addr);
                    setrepre({ ...srepre, xzcode: e.target.value, xadre1: pref, xadre2: city, xadre3: addr });
                })
                .catch(error => {
                    // xử lý lỗi ở đây
                    console.error(error);
                });
        }
    }

    // 戻る
    const fprevi = () => {
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
        let xconti = true;
        for (let key in srepre) {
            if (srepre.hasOwnProperty(key)) {
                if (i18n.language == 'jp') {
                    if (key != "xadre4" && !srepre[key]) {
                        xconti = false;
                        break;
                    }
                } else {
                    if (key != "xadre4" && key != "xfhame" && key != "xlhame" &&
                        key != "xzcode" && key != "xadre1" && key != "xadre2" &&
                        key != "xadre3" && !srepre[key]) {
                        xconti = false;
                        break;
                    }
                }
            }
        }

        if (xconti) {
            // 代表者情報を使用します
            let luseri = localStorage.getItem("luseri");
            let xuserx = JSON.parse(luseri);
            let xsavel = false;
            Object.keys(xuserx).map((key, idx) => {
                const xuseri = xuserx[key].xuseri;
                if (xuseri.ufolow) {
                    xsavel = true;
                    xuserx[idx].xuseri.ukfnam = srepre.xfname;
                    xuserx[idx].xuseri.uklnam = srepre.xlname;
                    xuserx[idx].xuseri.uhfnam = srepre.xfhame;
                    xuserx[idx].xuseri.uhlnam = srepre.xlhame;
                    xuserx[idx].xuseri.udxsex = srepre.xdxsex;
                }
            });
            if (xsavel) {
                localStorage.setItem("luseri", JSON.stringify(xuserx));
            }

            localStorage.setItem("lrepre", JSON.stringify(srepre));
            dispatch({ type: 'NXPRID', payload: +1 });
            navigate('/userinfo');
        } else {
            dispatch({ type: 'MODAL', payload: [1, t('NM0001')] });
        }

    }

    // jsx html
    const Category = (props) => {
        return (
            <div className="d-flex align-items-center mt-2">
                <img src={props.icon} />
                <div className="px-2">{props.clable}</div>
                <div className="" style={{ flex: 1 }}><hr /></div>
            </div>
        )
    }

    useEffect(() => {
        setnxpram(true);
    }, []);
    return (
        <div>
            <CSSTransition in={nxpram} timeout={300} classNames={slanim} unmountOnExit >
                <div className='position-fixed start-0 top-0 bottom-0 end-0 pb-5 vh-100 overflow-auto'>
                    <div className="text-center mt-5 pt-2 fs-5 fw-blod bg-light">
                        {t('代表者情報')}
                    </div>
                    <Container className="pb-5">
                        <Category icon={imname} clable={t('代表者氏名')} />
                        <Row className="pt-2">
                            <Col xs={6}>
                                <Form.Control type="text" placeholder={t('姓')} name='xfname' onChange={(setval)} value={srepre.xfname}
                                    className={xvalid ? srepre.xfname ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder={t('名')} name='xlname' onChange={setval} value={srepre.xlname}
                                    className={xvalid ? srepre.xlname ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                        </Row>
                        {i18n.language == 'jp' ?
                            <Row className="pt-2">
                                <Col xs={6}>
                                    <Form.Control type="text" placeholder={t('セイ')} name='xfhame' onChange={setval} value={srepre.xfhame}
                                        className={xvalid ? srepre.xfhame ? 'is-valid' : 'is-invalid' : null} />
                                </Col>
                                <Col xs={6}>
                                    <Form.Control type="text" placeholder={t('メイ')} name='xlhame' onChange={setval} value={srepre.xlhame}
                                        className={xvalid ? srepre.xlhame ? 'is-valid' : 'is-invalid' : null} />
                                </Col>
                            </Row> : null
                        }

                        <Category icon={im_sex} clable={t('性別')} />
                        <div className="mb-5">
                            <ButtonGroup style={{ float: 'right' }}>
                                <ToggleButton id={`radio-0`} className='px-0 border' type="radio" variant={"outline-secondary"} style={{ width: "90px" }}
                                    value={0} checked={srepre.xdxsex == 0} name='xdxsex' onChange={setval}>{t('未選択')}
                                </ToggleButton>
                                <ToggleButton id={`radio-1`} className='px-0 border' type="radio" variant={"outline-secondary"} style={{ width: "90px" }}
                                    value={1} checked={srepre.xdxsex == 1} name='xdxsex' onChange={setval}>{t('男性')}
                                </ToggleButton>
                                <ToggleButton id={`radio-2`} className='px-0 border' type="radio" variant={"outline-secondary"} style={{ width: "90px" }}
                                    value={2} checked={srepre.xdxsex == 2} name='xdxsex' onChange={setval}>{t('女性')}
                                </ToggleButton>
                            </ButtonGroup>
                        </div>

                        <Category icon={imaddr} clable={t('住所')} />
                        <Row className="pt-2">
                            <Col xs={6}>
                                <Form.Control type="number" placeholder={t('zipcode')} name='xzcode' onChange={fxcode} value={srepre.xzcode}
                                    className={xvalid ? srepre.xzcode ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder={t('都道府県')} name='xadre1' onChange={setval} value={srepre.xadre1}
                                    className={xvalid ? srepre.xadre1 ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col xs={6}>
                                <Form.Control type="text" placeholder={t('市町村')} name='xadre2' onChange={setval} value={srepre.xadre2}
                                    className={xvalid ? srepre.xadre2 ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder={t('その他')} name='xadre3' onChange={setval} value={srepre.xadre3}
                                    className={xvalid ? srepre.xadre3 ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col xs={12}>
                                <Form.Control type="text" placeholder={t('番地')} name='xadre4' onChange={setval} value={srepre.xadre4} />
                            </Col>
                        </Row>

                        <Category icon={imphoe} clable={t('連絡先')} />
                        <Row className="pt-2 justify-content-end">
                            <Col xs={6}>
                                <Form.Control type="tel" placeholder={t('電話番号')} name='xphone' onChange={setval} value={srepre.xphone}
                                    className={xvalid ? srepre.xphone ? 'is-valid' : 'is-invalid' : null} />
                            </Col>
                        </Row>

                        <hr />

                        <div className="border border-danger mt-3 p-2 mb-5">
                            <div dangerouslySetInnerHTML={{ __html: t('representip1') }}></div>
                            <div dangerouslySetInnerHTML={{ __html: t('representip2') }}></div>
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
        </div>
    )
}


export default Frepre;