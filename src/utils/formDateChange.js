export default (type, obj, id) => {

    let newObj = {
        type: type,
        title: obj.title,
        content: obj.content,
        images: obj.imgs.map(item=>({ base64: item }))
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