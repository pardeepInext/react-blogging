<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use Illuminate\Support\Facades\Validator;
use App\Events\LikeBroadcast;
use App\Models\Blog;
use App\Models\User;
use App\Notifications\Like as LikeNotification;

class LikeController extends Controller
{
    function index(Request $request)
    {
        $validator = Validator::make($request->input(), [
            'user_id' => 'required',
            'blog_id' => 'required'
        ]);

        $blog = Blog::select('id', 'title', 'user_id')->find($request->blog_id);
        $user = User::select('id', 'name', 'image')->find($request->user_id);

        if ($validator->fails()) return response(['success' => false, 'errors' => $validator->errors()]);
        $like = Like::where('blog_id', $request->blog_id)->first();

        $response = $like ? $like->update(['is_liked' => !$like->is_liked]) : Like::create($request->only('user_id', 'blog_id'));
        User::find($blog->user_id)->notify(new LikeNotification(['user' => $user, 'blog' => $blog]));

        $likesCount = Like::where([['blog_id', '=', $request->blog_id], ['is_liked', '=', true]])->count();

        return response(compact('likesCount'));
    }
}
