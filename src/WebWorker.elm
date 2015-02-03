module WebWorker 
    ( spawn
    ) where

{-| A simple library for spawning and communicating with Web Workers.  Doesn't
handle errors or worker termination.

# Open a Connection
@docs connect
-}

import Signal (Signal)
import Json
import Native.WebWorker


{-| Spawn a new web-worker instance running the script named in the first
argument.  The worker can send and receive arbitrary json objects.
-}
spawn : String -> Signal Json.Value -> Signal Json.Value
spawn = Native.WebWorker.spawn
