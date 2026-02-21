import { useAppSelector } from "@/app/store/store"
import { Loader2 } from "lucide-react"

const GlobalLoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const isLoading = useAppSelector((state) => state.dashboard.isLoading)
    
    return (<>
        {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <Loader2 className="h-14 w-14 animate-spin" />
            </div>
        )}
        {children}
    </>
    )
}

export default GlobalLoaderProvider;