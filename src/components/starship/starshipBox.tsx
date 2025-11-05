import type { ShipEntry } from "../../data/apiTypes"

export default function StarshipBox({name , model}: ShipEntry) {
    return (
        <>
            <div className="mb-5 bg-gray-800">
                <div className="p-5 block lg:flex">
                    <div className="flex-1 text-center lg:text-left mb-5 lg:mb-0">
                    <h4 className="font-bold mb-2">{name}</h4>
                    <p className="text-xs">{model}</p>
                    </div>
                </div>
            </div>
        </>
    )
}