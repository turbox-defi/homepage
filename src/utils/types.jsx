export const types = {
    all: {
        name: 'All',
        icon: <span className="iconfont">&#xe644;</span>
    },
    exchange: {
        name: 'Exchange',
        icon: <span className="iconfont">&#xe63b;</span>
    },
    application: {
        name: 'Application',
        icon: <span className="iconfont">&#xe6d4;</span>
    },
    website: {
        name: 'Website',
        icon:  <span className="iconfont">&#xe667;</span>
    },
    token: {
        name: 'Token',
        icon:  <span className="iconfont">&#xe647;</span>
    },
    wallet_provider: {
        name: 'Wallet Provider',
        icon:  <span className="iconfont">&#xe60c;</span>
    },
    social_media: {
        name: 'Social Media',
        icon:  <span className="iconfont">&#xe639;</span>
    },
    phishing_website: {
        name: 'Phishing Site',
        icon:  <span className="iconfont">&#xe63f;</span>
    },
    others: {
        name: 'Others',
        icon:  <span className="iconfont">&#xe618;</span>
    }
}

export const getparamsShowLable = (list, type, name) => {
    const table = list.filter(item => item.key === type);
    try
    {
        let obj = table[0].params.filter(item=>item.name === name);
        return obj[0].label
    }catch(err){
        return '-'
    }
}