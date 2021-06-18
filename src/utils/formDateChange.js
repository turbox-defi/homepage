export default (type, obj, id) => {

    let newObj = {
        type: type,
        title: obj.title,
        content: obj.content,
        images: obj.imgs.map(item=>{ 
            if(item.indexOf('data:image') === 0){
                return {base64: item }
            }else{
                return {url: item }
            }
        })
    }

    if(id){
        newObj.accountId = id
    };

    delete obj.imgs;
    delete obj.title;
    delete obj.content;

    newObj.externalInfo = obj;

    return newObj;

}