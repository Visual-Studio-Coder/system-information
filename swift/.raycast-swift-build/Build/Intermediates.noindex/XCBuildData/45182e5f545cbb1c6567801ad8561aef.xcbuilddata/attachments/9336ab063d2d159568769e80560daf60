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
    (subpath \"/Users/vaibhavsatishkumar/Downloads/system-information/swift\")
)
(allow file-write*
    (subpath \"/Users/vaibhavsatishkumar/Downloads/system-information/swift/.raycast-swift-build/SourcePackages/plugins/swift.output/SystemInformation/RaycastTypeScriptPlugin\")
    (subpath \"/private/var/folders/8v/5fhbtf8s3l7_473rcym67lwm0000gn/T/TemporaryItems/NSIRD_xcodebuild_MZF73H\")
    (subpath \"/private/var/folders/8v/5fhbtf8s3l7_473rcym67lwm0000gn/T/TemporaryItems\")
)
" "/${BUILD_DIR}/${CONFIGURATION}/TypeScriptCodeGenerator" -h /Users/vaibhavsatishkumar/Downloads/system-information/swift/.raycast-swift-build/SourcePackages/plugins/swift.output/SystemInformation/RaycastTypeScriptPlugin/raycast.d.ts -i /Users/vaibhavsatishkumar/Downloads/system-information/swift/.raycast-swift-build/SourcePackages/plugins/swift.output/SystemInformation/RaycastTypeScriptPlugin/raycast.js -a "@raycast" -f /Users/vaibhavsatishkumar/Downloads/system-information/swift/Sources/StorageInfo.swift

