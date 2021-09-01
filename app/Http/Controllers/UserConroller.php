<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\NotificationResource;

class UserConroller extends Controller
{
    function notification($id)
    {
        $user = User::find($id);
        return response(['notifications' => NotificationResource::collection($user->notifications->sortByDesc('read_at')), 'unreadcount' => $user->unreadNotifications->count()]);
    }

    function readNotification(Request $request)
    {
        $unreadNotifications = User::find($request->id)->unreadNotifications;
        if ($request->notification_id == "all") {
            $unreadNotifications->markAsRead();
        }

        $unreadNotifications->when($request->notification_id, function ($query) use ($request) {
            return $query->where('id', $request->notification_id);
        })->markAsRead();

        // return  $result ? response('notification mark successfully') : response('something went wrong');
    }
}
