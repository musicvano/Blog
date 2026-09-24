---
title: "Common mistakes"
description: "Topic 15. Cross-platform .NET MAUI: Common mistakes"
outline: [2, 3]
sourceHash: "08b3905a7175d1a51db4fc6b1512b23d87b71d74f05d3364d15801848e03f32d"
---

# Common mistakes

## Common mistakes

Table 15.5 lists the mistakes most often made when developing .NET MAUI applications.

Table 15.5. Common mistakes in .NET MAUI applications {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the emulator takes minutes to start or does not start | no hardware virtualization, an ARM image, Windows on Arm | Hyper-V and WHPX or AEHD, an x86\_64 image; your own phone |
| `PermissionException` on Android | the permission is not declared in `AndroidManifest.xml` | add `uses-permission`, request it with `RequestAsync` |
| a binding "silently" does not work | no `x:DataType`, a typo in a name, the `DataTemplate` inherited the page type | `x:DataType` on the page and in the template, read the warnings |
| slow scrolling of a large list | a `CollectionView` in a `ScrollView` or `StackLayout`, the obsolete `ListView` | a `CollectionView` in a `*` row of a grid |
| `ArgumentException` in `GoToAsync` | the route is not registered, or an absolute `//note` navigation to a global route | `Routing.RegisterRoute`, relative `note` navigation |
| the app in the emulator does not see `localhost` | `localhost` in the emulator is the emulator itself | `10.0.2.2`, allow HTTP in Debug |
