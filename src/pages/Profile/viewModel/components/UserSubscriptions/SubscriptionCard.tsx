import React from 'react'
import {View,Text} from '@tarojs/components'
import { ISubscription } from '@/types'


interface IProps {
    subscription:ISubscription
    onPress:()=>void
}

const Info = ({leftText,rightText}:{leftText:string,rightText:string})=>{
    return(
        <View className={'flex-row-center'} style={{justifyContent:'space-between'}}>
            <Text>
                {leftText}
            </Text>
            <Text>
                {rightText}
            </Text>
        </View>
    )
}

const SubscriptionCard = ({subscription}:IProps)=>{
    return (
        <View className={'subscription-card__container'}>
            <Text>
                {subscription.payload}
            </Text>
            
        </View>
    )
}


export default SubscriptionCard