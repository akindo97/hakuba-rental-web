// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      jp: {
        translation: {
          hometip: `プレストEGレンタル事前登録サイトです。<br />
          レンタル受付の前に必ず登録し、QRコード表示してください。<br />
          一度に4人まで登録可能です。`,
          hometip1: `利用されるお客様（代表の方）の情報を入力してください<br />
          ２回目以降は不要です`,
          hometip2: `レンタルされるお客様の情報を入力してください<br /><br />`,
          hometip3: `レンタルする期間と商品を選択してください<br />
          ２回目以降は必ずレンタルする期間の変更をしてください`,
          hometip4: `登録内容をQRコードにして表示します`,

          // メニュー
          レンタル料金: 'レンタル料金',
          利用方法: '利用方法',
          マップ: 'マップ',
          QRコード表示: 'QRコード表示',

          代表者情報: '代表者情報',
          代表者氏名: '代表者氏名',
          姓: '姓',
          名: '名',
          セイ: 'セイ',
          メイ: 'メイ',
          年齢: '年齢',
          性別: '性別',
          未選択: '未選択',
          男性: '男性',
          女性: '女性',
          住所: '住所',
          zipcode: '〒 (例：1234567)',
          都道府県: '都道府県',
          市町村: '市町村',
          その他: 'その他',
          番地: '番地',
          連絡先: '連絡先',
          電話番号: '電話番号',
          representip1: `❊ 当サイトをご利用される方の情報を<br />
          　入力してください<br />
          　複数人ご登録される方は代表の方の<br />
          　情報を入力してください。`,
          representip2: `❊ ご入力された情報はお使いのスマート<br />
          　フォンにのみ保存されます。`,

          貸出者情報: '貸出者情報',
          一人目: '一人目',
          二人目: '二人目',
          三人目: '三人目',
          四人目: '四人目',
          歳: '歳',
          生年月日: '生年月日',
          年: '年',
          月: '月',
          日: '日',
          Y: '年',
          M: '月',
          D: '日',
          身長: '身長',
          例: '例',
          靴のサイズ: '靴のサイズ',
          体重: '体重',
          代表者情報からを使用します: '代表者情報を使用します',
          削除: '削除',
          貸出者氏名: '貸出者氏名',
          前の人へ: '前<br />の<br />人<br />へ',
          人を追加: '人<br />を<br />追<br />加',
          次の人へ: '次<br />の<br />人<br />へ',
          userinfotip1: `❊ レンタルされる方の情報を入力してください。<br />
          ❊ 入力はすべて必須になります。`,
          userinfotip2: `❊ 削除すると登録されたレンタル品選択<br />
          　情報も削除されます。`,

          レンタル品選択: 'レンタル品選択',
          利用者: '利用者',
          区別: '区別',
          貸出期間: '貸出期間',
          小計: '小計',
          合計: '合計',
          開始日: '開始日',
          返却日: '返却日',
          大人: '大人',
          子供: '子供',
          前の人: '前の人',
          次の人: '次の人',
          レンタル種目: 'レンタル種目（Item）',
          スキーヤーレベル: 'スキーヤーレベル',
          初級: '初級',
          中級: '中級',
          上級: '上級',
          スノーボードスタンス: 'スノーボードスタンス',
          レギュラー: 'レギュラー',
          左足前: '左足前',
          グーフィー: 'グーフィー',
          右足前: '右足前',
          itemselecttip1: `❊ 自己申告で構いませんので、スキーヤーレベルは必ずどれか選択してください。<br />
          ❊ スノーボード用品を選択された方は、必ずスタンスを選択してください。`,
          itemselecttip2: `削除すると登録された貸出者情報も削除されます。`,

          レンタル利用規約: 'レンタル利用規約',

          必ずお読みください: '必ずお読みください',
          terms: `１．受付時に身分証明書をご提示ください。<br />
          ２．貸出後はすべて自己管理にて<br />
          　お願いします。<br />
          ３．受付後の返金は致しません。<br />
          ４．ネジ等が緩むことがありますので確認を<br />
          　お願いします。<br />
          ５．破損、紛失等の場合は相当額の料金を<br />
          　申し受けます。<br />
          ６．貸出中の事故、怪我等一切責任を<br />
          　負いかねます。<br /><br />
          ※上記の内容をご了承の上、レンタルをご利用ください。`,
          termschk: `レンタル利用規約の内容について十分に理解したうえで、承諾することに同意します。`,

          受付用QRコード: '受付用QRコード',
          開: '開',
          返: '返',
          数: '数',
          代表者: '代表者',
          解放値: '解放値',
          代表者: '代表者',
          名前: '名前',
          様: '様',
          足: '足',
          利用金額: '利用金額',
          qrshowtip1: `❊ このQRコードをご提示いただきますと、受付できます。<br />
          ❊ この時点で清算は完了しておりません。受付でご精算ください。`,

          戻る: '戻る',
          次へ: '次へ',
          ホーム: 'ホーム',

          // Messenger
          の: 'の',
          NM0001: "赤いボックスを入力してください。",
          NM0002: "情報が完成していません。",
          NM0003: "削除しますか?",
          NM0010: "代表者情報を入力してください。",
          NM0011: "貸出者情報がまだ完了しません。",
          NM0012: "レンタル品選択がまだ完了しません。",
          NM0020: "貸出期間確認してください。",
          NM0021: "レンタル種目確認してください。",
          NM0022: "スキーヤーレベル確認してください。",
          NM0023: "スノーボードスタンス確認してください。",
          NM0025: "開始日異常です。",
          NM0026: "開始日異常です。(レンタル品選択画面）",
          NM0028: "開始日は現在の日付より前の日付です。",
        },
      },
      en: {
        translation: {
          hometip: `This is the pre-registration site for Presto EG Rental.<br />
          Please register in advance and display the QR code before rental reception.<br />
          You can register up to four people at once.`,
          hometip1: `Please enter the information of the customer who will be using the service<br />
          Not needed for the second time and thereafter.`,
          hometip2: `Please enter the information of the customer who will be renting.<br /><br />`,
          hometip3: `Please select the rental period and the items you wish to rent.<br />
          For the second time and thereafter, please make sure to modify the rental period.`,
          hometip4: `I will display the registered information as a QR code.`,

          // メニュー
          レンタル料金: 'Rental fee',
          利用方法: 'Usage instructions',
          マップ: 'Map',
          QRコード表示: 'Display QR code',

          代表者情報: 'Representative info',
          代表者氏名: "Representative's Name",
          姓: 'Surname',
          名: 'Given name',
          セイ: '-',
          メイ: '-',
          年齢: 'Age',
          性別: 'Gender',
          未選択: 'select',
          男性: 'Male',
          女性: 'Female',
          住所: 'Address',
          zipcode: 'Zip code',
          都道府県: 'Adress Line 1',
          市町村: 'Adress Line 2',
          その他: 'City',
          番地: 'State/Province/Region',
          連絡先: 'Contact information',
          電話番号: 'Phone number',
          representip1: `❊ To enter the information of individuals using this site, please provide the details for each person. If multiple people are registering, please enter the information of the representative person`,
          representip2: `❊ The information you entered will be saved only on your smartphone.`,

          貸出者情報: 'Lender info',
          一人目: 'First person',
          二人目: 'Secondperson',
          三人目: 'Third person',
          四人目: 'Fourth perso',
          歳: 'age',
          生年月日: 'Birthday',
          年: 'Year',
          月: 'Month',
          日: 'Day',
          Y: 'Y',
          M: 'M',
          D: 'D',
          身長: 'Height',
          例: 'Ex: ',
          靴のサイズ: 'Shoe size',
          体重: 'Weight',
          代表者情報からを使用します: 'Use representative info',
          削除: 'Del',
          貸出者氏名: "Lender's Name",
          前の人へ: 'P<br />R<br />E<br />V',
          人を追加: 'A<br />D<br />D<br />　',
          次の人へ: 'N<br />E<br />X<br />T',
          userinfotip1: `❊ Please enter the information of the person renting.<br />
          ❊ All entries are required.`,
          userinfotip2: `❊ Deleting will also remove the registered rental item selection information.`,

          レンタル品選択: 'Rental item selection',
          利用者: 'User',
          区別: 'Differ',
          貸出期間: 'Period',
          小計: 'Stotal',
          合計: 'Total',
          開始日: 'Start date',
          返却日: 'Return date',
          大人: 'Adult',
          子供: 'Child',
          前の人: 'Previous',
          次の人: 'Next',
          レンタル種目: 'Rental item',
          スキーヤーレベル: 'Skier level',
          初級: 'low',
          中級: 'medium',
          上級: 'high',
          スノーボードスタンス: 'Snowboard stance',
          レギュラー: 'Regular',
          左足前: 'Left forward',
          グーフィー: 'Goofy',
          右足前: 'Right forward',
          itemselecttip1: `❊ Please select a skiing level as self-declaration is acceptable.<br />
          ❊ If you have selected snowboarding equipment, please be sure to choose your stance.`,
          itemselecttip2: `Deleting will also remove the registered lender information.<br />`,

          レンタル利用規約: 'Rental terms and conditions',

          必ずお読みください: 'Please make sure to read.',
          terms: `１．Please present identification at the reception.<br />
          ２．After the rental, please manage everything on your own.<br />
          ３．No refunds will be provided after the reception.<br />
          ４．Screws and other components may loosen, so please check and tighten as needed.<br />
          ５．In case of damage, loss, etc., we will charge an appropriate amount.<br />
          ６．We cannot take responsibility for any accidents, injuries, or incidents during the rental period.<br /><br />
          ※Please use the rental service after acknowledging and accepting the above terms and conditions.`,
          termschk: `I agree to the terms and conditions of the rental agreement after fully understanding its contents.`,

          受付用QRコード: 'QR code for reception',
          開: 'S',
          返: 'R',
          数: 'N',
          代表者: 'Representative',
          日貸数: 'RT days',
          解放値: 'Release',
          名前: 'Name',
          様: '',
          足: 'shoe',
          利用金額: 'Usage amount',
          qrshowtip1: `❊ Presenting this QR code will allow for reception.<br />
          ❊ Settlement has not been completed at this point. Please settle at the reception.`,

          戻る: 'Back',
          次へ: 'Next',
          ホーム: 'Home',

          // Messenger
          の: ' ',
          NM0001: 'Please enter the red box.',
          NM0002: 'Information is incomplete',
          NM0003: "Are sure want to delete?",
          NM0010: 'enter representative information',
          NM0011: 'Lender information is not yet complete.',
          NM0012: 'Rental item selection is not yet complete.',
          NM0020: 'Please confirm the rental period.',
          NM0021: 'Please confirm the rental item.',
          NM0022: 'Please confirm the skier level.',
          NM0023: 'Please confirm the snowboard stance.',
          NM0025: "Start date is abnormal.",
          NM0026: "Start date is abnormal (Rental item selection screen).",
          NM0028: "The start date is a date before the current date.",
        },
      },
    },
    lng: 'jp',
    fallbackLng: 'jp',
  });

export default i18n;
