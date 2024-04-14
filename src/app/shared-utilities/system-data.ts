export const statusCode = {
    success: 200,
    invalid: 100,
    notFound: 101,
    insufficientCredit: 102,
    exist: 103,
    loginFail: 104
}

export const validationMessage = {
    invalid: 'is Invalid',
    notFound: 'is Not Found',
    insufficientCredit: 'Credit is Insufficient',
    exist: 'has Existed',
    loginFail: 'Login Fail'
}

export const regexValidation = {
    email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    contactNo: "^[+]?[0-9]*\.?[0-9]*",
    password: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
}

export const errorCodeStatus = {
    fixed: {
        id: 1,
        message: "Fixed"
    },
    inProgress: {
        id: 2,
        message: "InProgress"
    }
}

export const errorCodeSeverity = {
    unknown: {
        id: 0,
        message: "Unknown"
    },
    minor: {
        id: 1,
        message: "Minor"
    },
    medium: {
        id: 2,
        message: "Medium"
    },
    high: {
        id: 3,
        message: "High"
    },
    critical: {
        id: 4,
        message: "Critical"
    }
}

export const markerIconUrl = {
    blue : "assets/icons/map-location-blue.svg",
    red: "assets/icons/map-location-red.svg",
    green: "assets/icons/map-location-green.svg",
    yellow: "assets/icons/map-location-yellow.svg",
}

export const cpStatus = {
    available: "Available",
    preparing: "Preparing",
    charging: "Charging",
    suspendedEVSE: "SuspendedEVSE",
    suspendedEV: "SuspendedEV",
    finishing: "Finishing",
    reserved: "Reserved",
    unavailable: "Unavailable",
    faulted: "Faulted"
}

export const cpTransactionStatus = {
    inProgress: "In Progress",
    complete: "Complete",
    rejected: "Rejected",
}

export const cpRegistrationStatus = {
    Accepted : "Accepted",
    Pending : "Pending",
    Rejected : "Rejected"
}

export const resetType = {
    Hard : 0,
    Soft : 1,
}

export const messageTrigger = {
    bootNotification : 'BootNotification',
    diagnosticsStatusNotification : 'DiagnosticsStatusNotification',
    firmwareStatusNotification : 'FirmwareStatusNotification',
    heartbeat : 'Heartbeat',
    meterValues : 'MeterValues',
    statusNotification : 'StatusNotification',
}

export const availabilityType = {
    inoperative : 'Inoperative',
    operative : 'Operative',
}