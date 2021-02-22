import {useEffect, useState} from "react"
import {Button} from '@chakra-ui/react'
import { RiShareFill } from "react-icons/ri"
import {RWebShare} from "react-web-share"

export const ShareLinkButton = ({title, description}) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        setUrl(`${window.location.origin}${window.location.pathname}`)
    }, [])

    return <RWebShare
    data={{
        text: description,
        url,
        title,
    }}
>
    <Button leftIcon={<RiShareFill />} >Share</Button>
</RWebShare>
}