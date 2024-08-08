export const handlePdfLink = (fileName: string) => {
    const BASE_LINK = (process.env.NEXT_PUBLIC_STATIC || 'http://localhost:3000/')

    // const truncatedFilename = fileName.substring(0, fileName.indexOf("-@uuid@-"));
    
    return BASE_LINK + fileName
}