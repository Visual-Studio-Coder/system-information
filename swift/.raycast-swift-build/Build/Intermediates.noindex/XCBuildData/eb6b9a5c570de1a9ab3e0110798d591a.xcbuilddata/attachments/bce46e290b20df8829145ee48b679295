#!/bin/bash
/usr/bin/sandbox-exec -p "(version 1)
(deny default)
(import \"system.sb\")
(allow file-read*)
(allow process*)
(allow mach-lookup (global-name \"com.apple.lsd.mapdb\"))
(allow file-write*
    (subpath \"/private/tmp\")
    (subpath \"/private/var/folders/8v/5fhbtf8s3l7_473rcym67lwm0000gn/T\")
)
(deny file-write*
    (subpath \"/Users/vaibhavsatishkumar/system-information/swift\")
)
(allow file-write*
    (subpath \"/Users/vaibhavsatishkumar/system-information/swift/.raycast-swift-build/SourcePackages/plugins/swift.output/SystemInformation/RaycastSwiftPlugin\")
    (subpath \"/private/var/folders/8v/5fhbtf8s3l7_473rcym67lwm0000gn/T/TemporaryItems\")
    (subpath \"/private/var/folders/8v/5fhbtf8s3l7_473rcym67lwm0000gn/T/TemporaryItems/NSIRD_xcodebuild_7jmw2P\")
)
" "/${BUILD_DIR}/${CONFIGURATION}/SwiftCodeGenerator" -o /Users/vaibhavsatishkumar/system-information/swift/.raycast-swift-build/SourcePackages/plugins/swift.output/SystemInformation/RaycastSwiftPlugin/_RayMain.swift -m SystemInformation -t _RayMain

