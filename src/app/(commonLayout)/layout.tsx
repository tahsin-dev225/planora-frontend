import Navbar from "@/components/common/shared/navbar"
import Footer from "@/components/common/shared/footer"
import React from "react"

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default CommonLayout