import React, { useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { xrepre, xuseri, fpreso } from '../component/Sgloba';
import imhome from "../assets/images/original.webp";
import impre1 from "../assets/icons/material-person.png";
import impre2 from "../assets/icons/material-person-add.png";
import impre3 from "../assets/icons/awesome-skiing.png";
import imprqr from "../assets/icons/qrbtn.png";

export function F_home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    // 言語変換 - thay đổi ngôn ngữ
    const langue = useSelector((state) => state.myReducer.lang);
    useEffect(() => {
        changeLanguage(langue);
    }, [langue]);

    // デフォルトのデータを確認し、存在しない場合は追加します
    // kiểm tra các dữ liệu mặc định, nếu chưa có thì thêm vào
    const llangu = localStorage.getItem("llangu");
    if (!llangu) {
        localStorage.setItem("llangu", 'jp');
    }

    let lrepre = localStorage.getItem("lrepre");
    if (!lrepre) {
        localStorage.setItem("lrepre", JSON.stringify(xrepre));
        lrepre = JSON.stringify(xrepre);
    }

    let luseri = localStorage.getItem("luseri");
    if (!luseri) {
        localStorage.setItem("luseri", JSON.stringify(xuseri));
        luseri = JSON.stringify(xuseri);
    }

    // 
    const chkrep = () => {
        let xconti = true;
        const xrepre = JSON.parse(lrepre);
        for (let key in xrepre) {
            if (xrepre.hasOwnProperty(key)) {
                if (i18n.language == 'jp') {
                    if (key != "xadre4" && !xrepre[key]) {
                        xconti = false;
                        break;
                    }
                } else {
                    if (key != "xadre4" && key != "xfhame" && key != "xlhame" && !xrepre[key]) {
                        xconti = false;
                        break;
                    }
                }
            }
        }
        return xconti;
    }

    const chkuse = () => {
        const xuserx = JSON.parse(luseri);
        const xpreso = fpreso(xuserx);
        return xpreso;
    }

    // 代表者情報
    const repres = () => {
        dispatch({ type: 'NXPRID', payload: 0 });
        dispatch({ type: 'HOMEID', payload: 1 });
        navigate('./represen');
    }

    // 貸出者情報
    const userin = () => {
        if (chkrep()) {
            dispatch({ type: 'NXPRID', payload: 0 });
            dispatch({ type: 'HOMEID', payload: 2 });
            navigate('./userinfo');
        } else {
            dispatch({ type: 'MODAL', payload: [1, t('NM0010')] });
        }
    }

    // レンタル品選択
    const itemse = () => {
        if (chkuse() > 0) {
            dispatch({ type: 'NXPRID', payload: 0 });
            dispatch({ type: 'HOMEID', payload: 3 });
            navigate('./itemselect');
        } else {
            dispatch({ type: 'MODAL', payload: [1, t('NM0011')] });
        }
    }

    // 受付用QRコード
    const qrshow = () => {
        if (chkrep()) {
            const xslpre = chkuse();
            if (xslpre > 0) {
                const xitems = JSON.parse(luseri);
                let xitchk = true;
                let xdtchk = true;
                for (let i = 0; i < xslpre; i++) {
                    if (xitems[i].xitems.isitem.split('').every(char => char === '0')) {
                        xitchk = false;
                    }
                    if (new Date() > new Date(`${xitems[i].xitems.istart} 23:59:59`)) {
                        xdtchk = false;
                    }
                }
                if (xitchk && xdtchk) {
                    dispatch({ type: 'NXPRID', payload: 0 });
                    dispatch({ type: 'HOMEID', payload: 4 });
                    navigate('./qrshow');
                } else {
                    if (!xitchk) {
                        dispatch({ type: 'MODAL', payload: [1, t('NM0012')] });
                    } else if (!xdtchk) {
                        dispatch({ type: 'MODAL', payload: [1, t('NM0026')] });
                    }
                }
            } else {
                dispatch({ type: 'MODAL', payload: [1, t('NM0011')] });
            }
        } else {
            dispatch({ type: 'MODAL', payload: [1, t('NM0010')] });
        }
    }

    return (
        <Container className="vh-100" style={{
            backgroundImage: `url(${imhome})`,
            backgroundSize: 'cover',
            backgroundPositionX: 'center'
        }}>
            <div className="d-flex flex-column justify-content-center vh-100">
                <div className="pt-3 ">
                    <div className="text-white rounded p-1 mt-5" style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        fontSize: '0.7em',
                        marginBottom: '-3em'
                    }} dangerouslySetInnerHTML={{ __html: t('hometip') }}>
                    </div>
                </div>
                {i18n.language == 'en' ?
                    <div className='py-3'></div> : null
                }
                <div className="d-flex flex-column justify-content-center align-items-center px-2 h-100">
                    <div className="w-100 d-flex border border-2 rounded bg-danger p-1 text-white" onClick={repres}>
                        <div className="" style={{ flex: 1 }}>
                            <div className="d-flex fs-5 fw-blod mb-1">
                                <div>1.</div>
                                <div className="text-center" style={{ flex: 1 }}>　　{t('代表者情報')}</div>
                            </div>
                            <div style={{ fontSize: '0.65em' }} dangerouslySetInnerHTML={{ __html: t('hometip1') }}>
                            </div>
                        </div>
                        <div className="p-2" style={{ maxHeight: '4.1em' }}>
                            <img className="h-100" src={impre1} />
                        </div>
                    </div>
                    <div className="w-100 d-flex border border-2 rounded bg-danger p-1 text-white mt-3" onClick={userin}>
                        <div className="" style={{ flex: 1 }}>
                            <div className="d-flex fs-5 fw-blod mb-1">
                                <div>2.</div>
                                <div className="text-center" style={{ flex: 1 }}>　　 {t('貸出者情報')}</div>
                            </div>
                            <div style={{ fontSize: '0.65em' }} dangerouslySetInnerHTML={{ __html: t('hometip2') }}>
                            </div>
                        </div>
                        <div className="p-2">
                            <img className="h-100" style={{ maxHeight: '3.1em' }} src={impre2} />
                        </div>
                    </div>

                    <div className="w-100 d-flex border border-2 rounded bg-danger p-1 text-white mt-3" onClick={itemse}>
                        <div className="" style={{ flex: 1 }}>
                            <div className="d-flex fs-5 fw-blod mb-1">
                                <div>3.</div>
                                <div className="text-center" style={{ flex: 1 }}>　　{t('レンタル品選択')}</div>
                            </div>
                            <div style={{ fontSize: '0.65em' }} dangerouslySetInnerHTML={{ __html: t('hometip3') }}>
                            </div>
                        </div>
                        <div className="p-2">
                            <img className="h-100" style={{ maxHeight: '3.1em' }} src={impre3} />
                        </div>
                    </div>

                    <div className="border border-2 rounded bg-white p-1 text-dark mt-3 text-center" style={{ width: '14.1em' }} onClick={qrshow}>
                        <div className="d-flex fs-5 fw-blod mb-1">
                            <div>4.</div>
                            <div className="text-center" style={{ flex: 1 }}>{t('受付用QRコード')}　</div>
                        </div>
                        <div className="">
                            <img className="h-100" src={imprqr} />
                            <div style={{ fontSize: '0.7em' }} dangerouslySetInnerHTML={{ __html: t('hometip4') }}>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='PC-block top-0 start-0 bottom-0 end-0 bg-white justify-content-center align-items-center'
                style={{ zIndex: 2, display: 'none' }}>
                <div className='fs-1 text-center text-danger'>
                    PCでは表示されません。
                    <br />
                    スマートフォンから再度アクセスしてください。
                </div>
            </div>
            {/* <div className='position-absolute bottom-0 end-0 bg-danger'
                onClick={() => { localStorage.removeItem("luseri"); alert("貸出者情報削除しました。ページをリロードしてください。") }}>
                貸出者情報削除
            </div> */}
        </Container>
    )
}

export default F_home;