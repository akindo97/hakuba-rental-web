import { useTranslation } from 'react-i18next';
import imcost from '../assets/images/cost.png';
import imback from '../assets/icons/back.png';

export function F_cost({ onback }) {
    const { t } = useTranslation();
    const backbt = () => {
        // Gọi hàm callback được truyền từ component cha
        if (onback) {
          onback();
        }
      };

    return (
        <div className='position-fixed start-0 top-0 bottom-0 end-0 pb-5 vh-100 bg-white overflow-auto' style={{zIndex: 1}}>
            <div className="text-center mt-5 pt-2 d-flex bg-light">
                <div className='d-flex align-items-center'onClick={backbt} style={{height: '32px', marginTop: '-5px'}}>
                    <img className='h-100 ps-2' src={imback} />
                    <div className='ps-1'>
                        戻る
                    </div>
                </div>
                <div className='flex-grow-1 fs-5 fw-blod'>
                    {t('レンタル料金')}　　　
                </div>
            </div>
            <div className='px-1 w-100 bg-white overflow-auto'>
                <img src={imcost} />
            </div>
        </div>
    )
}   