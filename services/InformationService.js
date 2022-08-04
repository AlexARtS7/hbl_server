const {ProductInfo, ProductDescription} = require('../models/models')

class InformationService {
    async setInfo({info,id}) {
        info = JSON.parse(info)    
        const allInfo = await ProductInfo.findAll({ where: {productId:id}})
        if(info.length < allInfo.length) {
            allInfo.forEach(item => info.find(i => i.idKey === item.idKey) ? null:
                ProductInfo.destroy({where: {idKey:item.idKey}}))
        }
        info.forEach(i =>
            ProductInfo.findOne({where: {idKey:i.idKey}})
            .then(response => {
                const data = {title: i.title, info: i.info, idKey: i.idKey, productId: id}
                if(response !== null) {
                    ProductInfo.update(data,{where: {idKey:i.idKey}})  
                } else {
                    ProductInfo.create(data)
                }
            })
        )
        return id    
    }
    async setDescription({description,id}) {
        ProductDescription.findOne({where: {productId:id}})
        .then(response => {
            if(response !== null) {
                ProductDescription.update({description},{where: {productId:id}})  
            } else {
                ProductDescription.create({description, productId:id})
            }
        })
        return id    
    }                
}

module.exports = new InformationService()