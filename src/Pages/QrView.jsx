import { useLocation } from "react-router-dom";


export default function QrView () {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const qrImage = queryParams.get("img");
    return (
        <div className="w-full h-screen flex justify-center items-center bg-black">
        {qrImage ? (
        <img
            src={qrImage}
            alt="QR Code"
            className="rounded-2xl shadow-lg w-xl h-xl"
        />
        ) : (
            <p className="text-white">No QR code found</p>
        )}
        </div>
    )
}
