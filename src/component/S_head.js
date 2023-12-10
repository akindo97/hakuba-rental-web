
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { F_cost } from './Snmenu';
import immenu from '../assets/icons/menu.png';
import imlogo from '../assets/images/logo.png';
import imlang from '../assets/icons/language.png';
import imcenc from '../assets/icons/cancel.png';
import imhome from '../assets/icons/home.png';
import impric from '../assets/icons/price-tag.png';
import imidea from '../assets/icons/idea.png';
import im_map from '../assets/icons/map.png';
import imscan from '../assets/icons/scan.png';
import imnext from '../assets/icons/next-26-32.png';

function F_hear() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const modal = useSelector((state) => state.myReducer.modal);
    useEffect(() => {
        if (modal[0] == 0) {
            handleClose();
        }
        if (modal[0] == 1) {
            handleShow();
        }
    }, [modal]);


    const [xsmenu, setsmenu] = useState(false);
    const [xamenu, setamenu] = useState(false);

    const [xblang, setblang] = useState(false);
    const langue = useSelector((state) => state.myReducer.lang);

    const Japanese = () => {
        dispatch({ type: 'LANGUA', payload: 'jp' });
        localStorage.setItem("llangu", 'jp');
        setblang(false);
    }

    const English = () => {
        dispatch({ type: 'LANGUA', payload: 'en' });
        localStorage.setItem("llangu", 'en');
        setblang(false);
    }

    // 言語変換 - thay đổi ngôn ngữ
    useEffect(() => {
        changeLanguage(langue);
    }, [langue]);

    // メニュー
    const Menu = () => {
        if (xsmenu) {
            setTimeout(() => {
                setamenu(!xsmenu);
            }, 280);
        } else {
            setamenu(!xsmenu);
        }
        setsmenu(!xsmenu);
    }

    const [xscost, setscost] = useState(false);

    const fbhome = () => {
        navigate('./');
        if (xscost) { setscost(false) };
    }

    return (
        <>
            <header className="position-fixed top-0 start-0 end-0 bg-white border-bottom" style={{ zIndex: 2 }}>
                <div className="d-flex align-items-center justify-content-between  p-1" style={{ height: '3.2em' }} >
                    <div className='text-center' onClick={Menu}>
                        <img className='iicons' src={!xsmenu ? immenu : imcenc} />
                    </div>
                    <div className='d-flex justify-content-center w-100 h-100'>
                        <img className='h-100' src={imlogo} />
                        {/* <div className='fw-bold fs-5 ps-1' style={{ color: 'rgb(59 59 60)' }} >
                            <div className='' style={{ fontSize: '0.9em', marginTop: '-0.2em' }}>スノーウェーブパーク</div>
                            <div className='fs-4' style={{ marginTop: '-0.5em' }}>白鳥高原</div>
                        </div> */}
                    </div>
                    <div className='text-center' onClick={() => setblang(!xblang)}>
                        <img src={imlang} />
                        <div className='if08em' style={{ marginTop: '-0.5em' }}>language</div>
                    </div>
                </div>
                <CSSTransition in={xblang} timeout={300} classNames='zin' unmountOnExit >
                    <div className='position-absolute end-0 bg-white border-start border-bottom px-1' style={{ marginTop: '-1px' }}>
                        <div className={`py-1 ${langue == 'jp' ? 'bg-warning' : ''}`} onClick={Japanese}>日本語 (Japanese)</div>
                        <div className={`py-1 my-1 ${langue == 'en' ? 'bg-warning' : ''}`} onClick={English}>英語 　(English)</div>
                    </div>
                </CSSTransition>
            </header>

            <div className={`position-absolute start-0 end-0 bottom-0 ${!xamenu ? 'd-none' : ''}`} onClick={Menu}
                style={{ zIndex: 2, top: '3.2em', backgroundColor: '#00000082' }}>
                <CSSTransition in={xsmenu} timeout={300} classNames='fademenu' unmountOnExit >
                    <div className='bg-white w-75 h-100 position-absolute' style={{ maxWidth: '16em' }}>
                        <div className='d-flex align-items-center border-bottom p-2' onClick={fbhome}>
                            <img src={imhome} />
                            <div className='flex-grow-1 py-2 ps-2'>{t('ホーム')}</div>
                            <img src={imnext} />
                        </div>
                        <div className='d-flex align-items-center border-bottom p-2' onClick={() => setscost(true)}>
                            <img src={impric} />
                            <div className='flex-grow-1 py-2 ps-2'>{t('レンタル料金')}</div>
                            <img src={imnext} />
                        </div>
                        <div className='d-flex align-items-center border-bottom p-2' onClick={() => alert("作業中")}>
                            <img src={imidea} />
                            <div className='flex-grow-1 py-2 ps-2'>{t('利用方法')}</div>
                            <img src={imnext} />
                        </div>
                        <div className='d-flex align-items-center border-bottom p-2' onClick={() => alert("作業中")}>
                            <img src={im_map} />
                            <div className='flex-grow-1 py-2 ps-2'>{t('マップ')}</div>
                            <img src={imnext} />
                        </div>
                        <div className='d-flex align-items-center border-bottom p-2' onClick={() => alert("作業中")}>
                            <img src={imscan} />
                            <div className='flex-grow-1 py-2 ps-2'>{t('QRコード表示')}</div>
                            <img src={imnext} />
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <CSSTransition in={xscost} timeout={300} classNames='zin' unmountOnExit >
                <F_cost onback={() => setscost(false)} />
            </CSSTransition>
            {/* {xscost ? <F_cost onback={() => setscost(false)} /> : null} */}

            <Modal show={show} onHide={handleClose} centered className='px-3'>
                <Modal.Header className='py-2' closeButton>
                    <Modal.Title>通知</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal[1]}</Modal.Body>
                <Modal.Footer className='py-2'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default F_hear;