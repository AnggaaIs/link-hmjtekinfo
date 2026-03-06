import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/supabase/client';
import type { Link } from '$lib/types/redirect';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const { data, error } = await supabaseAdmin
		.from('links')
		.select('*')
		.eq('slug', slug)
		.eq('active', true)
		.single<Link>();

	if (!error && data && data.slug === slug) {
		supabaseAdmin
			.rpc('increment_link_clicks', {
				link_slug: slug
			})
			.then();

		return {
			link: data
		};
	}

	return {
		link: null
	};
};
