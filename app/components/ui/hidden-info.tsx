interface IHiddenInfoProps {
    info: string;
    reveal: boolean;
}

export default function HiddenInfo({info, reveal}: IHiddenInfoProps) {
    return (<div>{info}</div>)
}