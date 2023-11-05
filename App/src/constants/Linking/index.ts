const config = {
    screens: {
        Oauth: {
            path: "oauth/:service",
            parse: {
                service: (service: string) => `${service}`
            }
        },
    }
}

const Linking = {
    prefixes: ["area://app"],
    config
}

export default Linking