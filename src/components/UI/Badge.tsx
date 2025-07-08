type BadgeProps = {
    children: React.ReactNode;
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "pink" | "gray" | "black" | "white";
}

export default function Badge({ children, color }: BadgeProps) {
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${matchBadgeColor(color)}`}>
        {children}
    </span>
}


function matchBadgeColor(color: string) {
    switch (color) {
        case "blue":
            return "bg-blue-100 text-blue-800";
        case "green":
            return "bg-green-100 text-green-800";
        case "red":
            return "bg-red-100 text-red-800";
        case "yellow":
            return "bg-yellow-100 text-yellow-800";
        case "purple":
            return "bg-purple-100 text-purple-800";
        case "orange":
            return "bg-orange-100 text-orange-800";
        case "pink":
            return "bg-pink-100 text-pink-800";
        case "gray":
            return "bg-gray-100 text-gray-800";
        case "black":
            return "bg-black text-white";
        case "white":
            return "bg-white text-black";
    }
}