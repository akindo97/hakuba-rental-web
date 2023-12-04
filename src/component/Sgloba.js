
export const notifi = {
    NM0001: "赤いボックスを入力してください。",

    NM0010: "代表者情報を入力してください。",
    NM0011: "貸出者情報を入力してください。",
}

export const xordin = ["一人目", "二人目", "三人目", "四人目"];

// 代表的な情報 - thông tin người đại diện
export const xrepre =
{
    xfname: "",
    xlname: "",
    xfhame: "",
    xlhame: "",
    xdxsex: "0",
    xzcode: "",
    xadre1: "",
    xadre2: "",
    xadre3: "",
    xadre4: "",
    xphone: ""
};

// 利用者情報 - thông tin người sử dụng
export const xuseri = {
    0: {
        xuseri: {
            ufolow: false,
            ukfnam: "",
            uklnam: "",
            uhfnam: "",
            uhlnam: "",
            udxsex: 0,
            u_year: "",
            umonth: "",
            u__day: "",
            u__age: "",
            uheigh: "",
            ufsize: "",
            uweigh: "",
            clsify: "",
            usctry: 0,
            usikbt: 0
        },
        xitems: {
            istart: "",
            isampm: 0,
            i__end: "",
            i2ampm: 0,
            i__day: 0,
            isitem: "000000000000",
            isubtl: 0,
            ilevel: 0,
            istanc: 0,
        }
    },
    1: {
        xuseri: {
            ufolow: false,
            ukfnam: "",
            uklnam: "",
            uhfnam: "",
            uhlnam: "",
            udxsex: 0,
            u_year: "",
            umonth: "",
            u__day: "",
            u__age: "",
            uheigh: "",
            ufsize: "",
            uweigh: "",
            clsify: "",
            usctry: 0,
            usikbt: 0
        },
        xitems: {
            istart: "",
            isampm: 0,
            i__end: "",
            i2ampm: 0,
            i__day: 0,
            isitem: "000000000000",
            isubtl: 0,
            ilevel: 0,
            istanc: 0,
        }
    },
    2: {
        xuseri: {
            ufolow: false,
            ukfnam: "",
            uklnam: "",
            uhfnam: "",
            uhlnam: "",
            udxsex: 0,
            u_year: "",
            umonth: "",
            u__day: "",
            u__age: "",
            uheigh: "",
            ufsize: "",
            uweigh: "",
            clsify: "",
            usctry: 0,
            usikbt: 0
        },
        xitems: {
            istart: "",
            isampm: 0,
            i__end: "",
            i2ampm: 0,
            i__day: 0,
            isitem: "000000000000",
            isubtl: 0,
            ilevel: 0,
            istanc: 0,
        }
    },
    3: {
        xuseri: {
            ufolow: false,
            ukfnam: "",
            uklnam: "",
            uhfnam: "",
            uhlnam: "",
            udxsex: 0,
            u_year: "",
            umonth: "",
            u__day: "",
            u__age: "",
            uheigh: "",
            ufsize: "",
            uweigh: "",
            clsify: "",
            usctry: 0,
            usikbt: 0
        },
        xitems: {
            istart: "",
            isampm: 0,
            i__end: "",
            i2ampm: 0,
            i__day: 0,
            isitem: "000000000000",
            isubtl: 0,
            ilevel: 0,
            istanc: 0,
        }
    }
}

// 価格 - PRICE
export const xOpric = [ // 大人
    //  ski  ,boots,spole,board,boost,jacket,helmet,sled,zipfy,racer,shoe, skat
    [3000, 1500, 1000, 3000, 1500, 3000, 1000, 0, 0, 0, 0, 0],
    [3000, 0, 0, 0, 0, 0, 0, 1000, 1800, 4000, 3500, 0], // 1日
    [0, 0, 0, 0, 0, 0, 0, 0, 1000, 0, 3000, 3500], // 4H
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1500, 0, 2000], // 2H
    [4000, 0, 0, 4000, 0, 0, 0, 0, 0, 0, 0, 0], // セット1
    [4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // セット2
]
export const xKpric = [ // 子供
    //  ski  ,boots,spole,board,boost,jacket,helmet,sled,zipfy,racer,shoe, skat
    [2500, 1500, 1000, 2500, 1500, 2500, 1000, 0, 0, 0, 0, 0],
    [2500, 0, 0, 0, 0, 0, 0, 1000, 1800, 4000, 3500, 0], // 1日
    [0, 0, 0, 0, 0, 0, 0, 0, 1000, 0, 3000, 3500], // 4H
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1500, 0, 2000], // 2H
    [3500, 0, 0, 3500, 0, 0, 0, 0, 0, 0, 0, 0], // セット1
    [3500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // セット2
]

export const xiname = [ // レンタル種目名
    //  ski  ,boots,spole,board,boost,jacket,helmet,sled,zipfy,racer,shoe, skat
    ["スキー板のみ", "スキーブーツのみ", "ストック", "スノーボードのみ", "ボードブーツのみ", "ウェアーセット", "ヘルメット", "ソリ", "ZIPFY", "スノーレーサー", "スノーシュー", "スノースケート"],
    ["ファンスキー板のみ", 0, 0, 0, 0, 0, 0, "ソリ（１日）", "ZIPFY（１日）", "スノーレーサー（１日）", "スノーシュー + ストック（１日）", 0], // 1日
    [0, 0, 0, 0, 0, 0, 0, 0, "ZIPFY（4H）", 0, "スノーシュー（4H）", "スノースケート + ストック（4H）"], // 4H
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "スノーレーサー（2H）", 0, "スノースケート（2H）"], // 2H
    ["スキーセット", 0, 0, "スノーボードセット", 0, 0, 0, 0, 0, 0, 0, 0], // セット1
    ["ファンスキーセット", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // セット2
]

// セット分析
export const setpre = {
    skiset1: {
        isitem: "111000000000", // スキー１場合
        inewse: "500000000000", // スキー
        itract: 1500, // 差し引かれた金額
    },
    skiset2: {
        isitem: "110000000000", // スキー２場合
        inewse: "500000000000", // スキー
        itract: 500, // 差し引かれた金額
    },
    skiset3: {
        isitem: "211000000000", // スキー３場合
        inewse: "600000000000", // ファンス
        itract: 1500, // 差し引かれた金額
    },
    skiset4: {
        isitem: "210000000000", // スキー４場合
        inewse: "600000000000", // ファンス
        itract: 500, // 差し引かれた金額
    },
    boardset: {
        isitem: "000110000000", // ボード場合
        inewse: "000500000000", // 
        itract: 500, // 差し引かれた金額
    }
}

// サイズの種類
export const xsctry = ["", "JP", "US", "EU"];

// サイズの区分
export const xsikbt = ["", "M", "W", "J", "Y"];

// 靴のサイズ - size dày
export const xmemsi = [
    [
        [25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31], // JP
        [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13], // US
        [39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47] // EU
    ],
    [
        [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 28, 28.5], // JP
        [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11], // US
        [36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42] // EU
    ],
    [
        [20, 20.5, 21, 21.5, 22, 22.5, 22.8, 23, 23.5, 24, 24.5], // JP
        [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],  // US
        [32, 33, 33.5, 34, 35, 35.5, 36, 36.5, 37, 37.5, 38], // EU
    ],
    [
        [15, 15.5, 16, 16.3, 16.5, 16.8, 17, 17.5, 18, 18.5, 19, 19.5],  // JP
        [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],  // US
        [25, 25.5, 26, 26.5, 27, 27.5, 28, 29, 29.5, 30, 31, 31.5]  // EU
    ]
];

// delete
export function fdelif(varnow, vardel) {
    let varori = xuseri;
    let xcount = 0;
    for (const key in varnow) {
        if (key == vardel) {
            continue;
        } else {
            varori[xcount] = varnow[key];
            xcount += 1;
        }
    }
    return varori;
}

// 人数調査 - tìm số người
export function fpreso(xrtinf) {
    let xresul = 0;
    Object.keys(xrtinf).map((key) => {
        const xuseri = xrtinf[key].xuseri;
        // 少なくとも 1 つの入力に値があればチェックします - chỉ kiểm tra nếu có ít nhất 1 input có giá trị
        const hasval = Object.values(xuseri).some(value => value !== "" && value !== false && value !== 0);
        if (hasval) {
            xresul += 1;
        }
    });
    return xresul;
}

// 数値を金額表示に変換する
export function fcvmny(xtmint) {
    return String(xtmint).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

// // Dialog
// export function Fmodal(props) {
//     return (
//         <Modal
//             {...props} aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header className="py-2" closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     通知
//                 </Modal.Title>
//             </Modal.Header >
//             <Modal.Body className="py-2">
//                 <h4>{props.title}</h4>
//                 <div>
//                     {props.content}
//                 </div>
//             </Modal.Body>
//             <Modal.Footer className="py-2">
//                 <Button onClick={props.confirm}>削除</Button>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }