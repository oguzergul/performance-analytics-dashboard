import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid";

const Footer = ({onPrev, onNext, rightDisabled, leftDisabled}) => {
    return (
        <footer className="border flex flex-row mb-4 justify-between">
            <button disabled={leftDisabled} onClick={onPrev} className="border-r-2 py-2 px-2">
                <ArrowLeftIcon height={22}/>
            </button>
            <button disabled={rightDisabled} onClick={onNext} className="border-l-2 py-2 px-2">
                <ArrowRightIcon height={22}/>
            </button>
        </footer>)
}
export default Footer