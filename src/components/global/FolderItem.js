import {FolderIcon} from "@heroicons/react/outline";

const FolderItem = ({t,url}) => {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <FolderIcon className="w-4 mr-2 mb-1" />
                <p className="block text-sm">{url}</p>
            </div>

            <p>{t}ms</p>
        </div>
    )
}
export default FolderItem