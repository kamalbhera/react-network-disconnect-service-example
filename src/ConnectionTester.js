import { useState, useEffect, useLayoutEffect } from 'react';

const estilo={
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
    overflow: 'hidden',
    objectFit: 'fill',
}

const estiloimg={
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    margin:'auto',
    height:'50%',
    width:'50%'
}

const ConnectionTester = (props) => {
    const [url, setUrl] = useState('/');
    const [urlPoll, setUrlPoll] = useState(15000);
    const [urlTimeout, setUrlTimeout] = useState(1500);
    const [isOffline, setIsOffline] = useState(false);
    const [isLeavingPage, setIsLeavingPage] = useState(false);

    useEffect(() => {
        let controllerTimeout = 0;
        const interval = setInterval(() => {
            if (document.visibilityState !== 'visible') return;
            const controller = new AbortController();
            controllerTimeout = setTimeout(() => controller.abort(), urlTimeout);
            fetch(url, {
                mode: 'no-cors',
                method: 'HEAD',
                signal: controller.signal
            })
            .then((response) => {
                setIsOffline(false)
                clearTimeout(controllerTimeout);
            })
            .catch((error) => {
                // console.dir(error);

                setIsOffline(true)

                clearTimeout(controllerTimeout);
            });

        }, urlPoll);

        return () => {
            clearTimeout(controllerTimeout);
            clearInterval(interval);
            // console.log('connection tester cleanup');
        }

    }, [isOffline, url, urlPoll, urlTimeout]);

    useLayoutEffect(() => {
        const handleBeforeUnload = (e) => {
            setIsLeavingPage(true);
        };

        window.addEventListener('beforeunload', handleBeforeUnload );
    }, [])

    useEffect(() => {
        if (props.url)
            setUrl(props.url);
        if (props.poll)
            setUrlPoll(props.poll);
        if (props.timeout)
            setUrlTimeout(props.timeout);
    }, [props])


    return (
        (isOffline && !isLeavingPage) && (
            <div style={estilo}>
                <img style={estiloimg} src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuODggMTIyLjg4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6I2Q5MmQyNzt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPm5vLXdpZmk8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEwMS42OCwzMi45MywzMi45MiwxMDEuNjhhNDkuMjksNDkuMjksMCwwLDAsNzcuODMtNDAuMjRoMEE0OS4zNCw0OS4zNCwwLDAsMCwxMDgsNDUuMTVhNDguODUsNDguODUsMCwwLDAtNi4zMi0xMi4yMlpNMjQsOTMuNSw5My40OSwyNEE0OS4zMSw0OS4zMSwwLDAsMCwyNCw5My41WiIvPjxwYXRoIGQ9Ik0zMC4yOSw1MkEzLDMsMCwwLDEsMjYsNTEuNjN2MGEzLDMsMCwwLDEsLjM0LTQuMjRoMEE1OS4yNyw1OS4yNywwLDAsMSw0My4yNywzN2E0OCw0OCwwLDAsMSwzNi40LjMxQTYxLDYxLDAsMCwxLDk2LjQ2LDQ3LjlhMS4yOSwxLjI5LDAsMCwxLC4xNy4xNiwzLDMsMCwwLDEsLjI3LDQuMDcsMS41NCwxLjU0LDAsMCwxLS4xNy4xOSwzLDMsMCwwLDEtNC4xNi4xOUE1NS4yMyw1NS4yMywwLDAsMCw3Ny40Nyw0M2E0MS44Niw0MS44NiwwLDAsMC0zMi4wOC0uMjdBNTMuMzgsNTMuMzgsMCwwLDAsMzAuMjksNTJaTTYxLjQ0LDc2LjA5QTYuNTksNi41OSwwLDEsMSw1Ni43Nyw3OGgwYTYuNjIsNi42MiwwLDAsMSw0LjY3LTEuOTNaTTUwLjA1LDcyLjVhMywzLDAsMCwxLTQuMTYtLjM1LDEuMzcsMS4zNywwLDAsMS0uMTYtLjE4LDMsMywwLDAsMSwuNDMtNC4wN2wuMTctLjE0YTI3LjY0LDI3LjY0LDAsMCwxLDcuMzMtNC4zMywyMS42OCwyMS42OCwwLDAsMSw3Ljg0LTEuNTIsMjEuMzUsMjEuMzUsMCwwLDEsNy44LDEuNDcsMjcuMTIsMjcuMTIsMCwwLDEsNy4zNCw0LjM2QTMsMywwLDAsMSw3Ny4wOCw3MmgwYTMsMywwLDAsMS0yLDEuMSwzLjA2LDMuMDYsMCwwLDEtMi4yMS0uNjZoMGEyMS4yNywyMS4yNywwLDAsMC01LjYyLTMuMzcsMTUuMTIsMTUuMTIsMCwwLDAtMTEuNDcsMCwyMiwyMiwwLDAsMC01LjcsMy40MVptLTkuNTYtOS43MS0uMTUuMTNhMy4wNiwzLjA2LDAsMCwxLTIuMDguNjcsMywzLDAsMCwxLTItMSwxLDEsMCwwLDEtLjE0LS4xNSwzLDMsMCwwLDEsLjM0LTQuMTYsNDUuNzgsNDUuNzgsMCwwLDEsMTIuMzYtOCwzMC43NiwzMC43NiwwLDAsMSwyNS42LjQyLDQ1Ljc0LDQ1Ljc0LDAsMCwxLDEyLjExLDguNDFsLjA4LjA3YTMuMDksMy4wOSwwLDAsMSwuODcsMiwzLDMsMCwwLDEtLjgyLDIuMTVsLS4wNy4wOGEzLDMsMCwwLDEtMiwuODcsMywzLDAsMCwxLTIuMTUtLjgxQTQwLjEzLDQwLjEzLDAsMCwwLDcyLDU2LjI4YTI0Ljc1LDI0Ljc1LDAsMCwwLTIxLS4zNSwzOS42OCwzOS42OCwwLDAsMC0xMC41LDYuODZaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjEuNDQsMEE2MS4zMSw2MS4zMSwwLDEsMSwzOCw0LjY2LDYxLjI5LDYxLjI5LDAsMCwxLDYxLjQ0LDBabTQwLjI0LDMyLjkzTDMyLjkzLDEwMS42OEE0OS40NCw0OS40NCwwLDAsMCw4MC4zMSwxMDcsNDkuNTMsNDkuNTMsMCwwLDAsMTA3LDgwLjNhNDksNDksMCwwLDAsMy43My0xOC44NmgwYTQ4LjkzLDQ4LjkzLDAsMCwwLTkuMDgtMjguNTFaTTI0LDkzLjUsOTMuNSwyNEE0OS4zMiw0OS4zMiwwLDAsMCwyNCw5My41WiIvPjwvc3ZnPg==" alt="no-wifi-icon.svg"/>
            </div>
        )
  )
};

export default ConnectionTester;