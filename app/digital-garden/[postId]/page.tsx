import Link from "next/link";
import { Post } from "../../types/types";

export default function page({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const post: Post = {
    Title: "Adversarial Nature to Life",
    Content: `There seems to be an inherent adversarial nature to nearly all aspects of life.

Why is kale so nasty but donuts taste so good?

Why is going to the gym hard, but being a couch potato and brain rotting on tiktok so easy?

Why is it hard to do the things that are good for us, and easy to do the things that are bad for us?


Why can't our anatomy be wired to enjoy doing the hard things? Why is it a delayed gratification? Why can't eating kale bring us instant gratification the same way that donuts do?

Maybe a million years ago when humans weren't apex predators, finding sugary food was scarce and was advantageous to consume immediately. Maybe having this instant gratification dopamine from that sugar rush is what saved us from sabertooth tigers. I can't say that I know for sure, but what seems to be apparent is this adversarial nature is hardcoded. 

So how should live our life with this in mind?

The defiance of this hardcoded adversarial nature is what prevents man from being great. In contrast, it is the very act of doing what is adversarial is what leads man to better oneself.

In other words, you should do what needs to be done, not what you want to do.

How do we do what needs to be done?

Doing the hard stuff is painful. The key is not mitigating the pain, but rather learning how to deal with the pain.

Some people deal with pain by flipping it on its head. They tell themselves they like the pain and become masochists. These people are crazy.

Others run away from pain. This may be done overtly or through self deception.

Here is an example of me overtly running away from pain:
I told myself I'm gonna start taking cold showers. I know I'm supposed to take this cold shower. I turn on the faucet and the initial wave of ice cold water splashes on my feet. It's really fucking cold. Little droplets of water splash all over my body and suddenly the circulation of air turns into what feels like little frostbites. I don't like it. I turn the knob to warm. Ahhhh, much better.

Now here is a self-deception example:
I'm about to do some machine chest press and this is my last set. I hype myself up, got some Excision blasting in my ears, and I start doing my set. 1, 2, 3, 4, 5, 6, 7...

Now here is the crucial part:

On the 8th rep, I pushed halfway, felt the burn kick TF in, put the weight down, huff and puff, drink some water, and tell myself 'dang I really couldn't get hat rep in. Must be because I did 3 solid sets before that. At least I did 7 reps, and failed on the 8th. At least I pushed myself to failure.'

THIS IS SELF DECEPTION. I did not actually reach failure. I thought the rep was hard, gave up, and found reasons to justify my actions.


There seems to be an inherent game nature to life, and it is the hard tasks that provide the most reward.

In weightlifting, there's this running joke about gym bros skipping leg day. The reason is because our legs contain the biggest muscles thus requiring immense energy and causing lots of fatigue. The muscle fibers in our legs are also very different compared to the rest of our body. They contain substantially more slow-twitch fibers which means our leg muscles are much better at endurance. This means that you can hit your heavy top sets over and over again with little to no weight drop, which bascially means leg days will leave you absolutely gassed.

It so happens to be that hitting legs, the most painful muscle group to work, is the one that literally raises testosterone levels and stimulates growth in literally all other muscle groups.


`,
    PostId: "adversarial-nature",
    Date: "November 2023",
  };
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/digital-garden"
          className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">←</span>
            <span>Back to Digital Garden</span>
          </div>
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">{post.Title}</h1>
          <div className="text-gray-500 text-sm mb-4">{post.Date}</div>
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.Content}
          </div>
        </article>
      </div>
    </>
  );
}
