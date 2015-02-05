module WebWorker
    ( Response(Waiting, Message, Error)
    , spawn
    ) where

{-| A simple library for spawning and communicating with Web Workers.

# Open a Connection
@docs connect
-}

import Signal (Signal)
import Json.Encode
import Json.Decode
import Native.WebWorker


type Response
    = Waiting
    | Message Json.Decode.Value
    | Error String


{-| Spawn a new web-worker instance running the script named in the first
argument.  The worker can send and receive arbitrary json objects.
-}
spawn : String -> Signal Json.Encode.Value -> Signal Response
spawn = Native.WebWorker.spawn
