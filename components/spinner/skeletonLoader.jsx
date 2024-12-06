export const SkeletonLoader = ({ columns = 6, rows = 5 }) => (
    <div className="w-full animate-pulse">
        <div className="min-w-full bg-white">
            <div className="border-b border-gray-200">
                <div className="flex">
                    <div className="w-12 h-10 bg-gray-200 m-2 rounded"></div>
                    {[...Array(columns)].map((_, i) => (
                        <div key={i} className="flex-1 h-10 bg-gray-200 m-2 rounded"></div>
                    ))}
                </div>
            </div>
            {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex border-b">
                    <div className="w-12 h-8 bg-gray-100 m-2 rounded"></div>
                    {[...Array(columns)].map((_, colIndex) => (
                        <div key={colIndex} className="flex-1 h-8 bg-gray-100 m-2 rounded"></div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default SkeletonLoader;